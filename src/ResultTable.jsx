import React from "react";

function ResultTable({ keyword, user, onAdded }) {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [editing, setEditing] = React.useState(null);
    // Tải dữ liệu 1 lần khi component mount 
    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => { setUsers(data); setLoading(false); });
    }, []);
    React.useEffect(() => {
        if (user) {
            setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
            onAdded();
        }
    }, [user]);
    function editUser(user) {
        setEditing({ ...user, address: { ...user.address } });
    }
    function saveUser() {
        setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
        setEditing(null);
    }
    const handleEditChange = (id, value) => {
        // Xử lý state lồng nhau (address)
        if (["street", "suite", "city"].includes(id)) {
            setEditing({
                ...editing,
                address: { ...editing.address, [id]: value }
            });
        } else {
            // Xử lý state cấp 1
            setEditing({ ...editing, [id]: value });
        }
    };
    function removeUser(id) {
        // Giữ lại tất cả người dùng có id khác với id cần xóa 
        setUsers((prev) => prev.filter((u) => u.id != id));
    }
    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(keyword.toLowerCase()) ||
            u.username.toLowerCase().includes(keyword.toLowerCase())
    );
    return (
        <> 
        {editing && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4>Sửa người dùng</h4>
                    <div>
                        <label htmlFor="edit_name">Name: </label>
                        <input id="name" type="text" value={editing.name}
                            onChange={(e) => handleEditChange("name", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="edit_username">Username: </label>
                        <input id="username" type="text" value={editing.username}
                            onChange={(e) => handleEditChange("username", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="edit_email">Email: </label>
                        <input id="email" type="text" value={editing.email}
                            onChange={(e) => handleEditChange("email", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="edit_city">City: </label>
                        <input id="city" type="text" value={editing.address.city}
                            onChange={(e) => handleEditChange("city", e.target.value)} />
                    </div>

                    <button onClick={saveUser}>Lưu</button>
                    <button onClick={() => setEditing(null)}>Hủy</button>
                </div>
            </div>
        )}
        <table border ="1" className="result-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
    <tbody>
    {filteredUsers.map((u) => (
        <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.address.city}</td>
            <td>
                <button className="btn-edit" onClick={() => editUser(u)}>Sửa</button>
                <button className="btn-delete" onClick={() => removeUser(u.id)}>Xóa</button>
            </td>
        </tr>
    ))}
    </tbody>
      </table>
</> );
}
export default ResultTable;