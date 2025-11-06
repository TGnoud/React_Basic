import React from 'react'
import './App.css'
import SearchForm from './SearchForm'
import ResultTable from './ResultTable'
import AddUser from './AddUser'

function App() {
const [kw, setKeyword] = React.useState(""); 
const [newUser, setNewUser] = React.useState(null); 
return ( 
<div> 
<SearchForm onChangeValue={setKeyword} /> 
<AddUser onAdd={setNewUser} /> 
<ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} />
</div>
);
}
export default App
