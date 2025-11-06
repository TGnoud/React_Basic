import React from "react";

function AddUser({ onAdd }) { 
const [adding, setAdding] = React.useState(false); 
const [user, setUser] = React.useState({ 
name: "", 
username: "", 
email: "", 
address: { street: "", suite: "", city: "" }, 
phone: "", 
website: "" 
}); 
const handleChange = (e) => { const { id, value } = e.target; 
if (["street", "suite", "city"].includes(id)) { 
setUser({ ...user, address: { ...user.address, [id]: value } }); 
} else { 
setUser({ ...user, [id]: value }); 
} 
}; 
const handleAdd = () => { 
if (user.name === "" || user.username === "") { 
alert("Vui lòng nhập Name và Username!"); 
return; 
} 
onAdd(user); 
setUser({ name: "", username: "", email: "", address: { street: "", 
suite: "", city: "" }, phone: "", website: "" }); 
setAdding(false); 
};
return (
<div> 
<button className="btn-new" onClick={() => setAdding(true)}>Thêm</button> 
{adding && ( 
<div className="modal-overlay"> 
    <div className="modal-content"> 
        <h4>Thêm người dùng</h4> 
            <div>
              <label htmlFor="name">Name: </label>
              <input id="name" type="text" value={user.name} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="username">Username: </label>
              <input id="username" type="text" value={user.username} onChange={handleChange}/>
            </div>
             <div>
              <label htmlFor="email">Email: </label>
              <input id="email" type="text" value={user.email} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="city">City: </label>
              <input id="city" type="text" value={user.address.city} onChange={handleChange}/>
            </div>
            
            <button onClick={handleAdd}>Lưu</button>
            <button onClick={() => setAdding(false)}>Hủy</button>
          </div>
        </div>
)}
</div>
);
}

export default AddUser;