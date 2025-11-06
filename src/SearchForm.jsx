import React from "react";


// Nhận prop 'onChangeValue' từ App
function SearchForm({ onChangeValue }) { 
return ( 
<input 
type="text" 
placeholder="Tìm theo name, username" 
onChange={(e) => onChangeValue(e.target.value)} 
/> 
); 
} 
export default SearchForm;