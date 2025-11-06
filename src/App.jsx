import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [kw, setKeyword] = React.useState(""); 
const [newUser, setNewUser] = React.useState(null); 
return ( 
<div> 
<SearchForm onChangeValue={setKeyword} /> 
<AddUser onAdd={setNewUser} /> 
<ResultTable keyword={kw} user={newUser} onAdded = {() => setNewUser(null)} /> 
</div>
);
}
export default App
