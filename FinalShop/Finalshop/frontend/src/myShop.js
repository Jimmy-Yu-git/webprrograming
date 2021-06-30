import './App.css';
import EnhancedTable from './containers/pages/Manage'
import Salepage from './containers/pages/SalePage'
import { useState } from 'react';
function Shop({user,isSearch, searchType, searchString ,setSearch}) {
    const [selectedRow,setSelectedRow]=useState([]);
    const [itemEdit,setItemEdit] = useState(false);
    //const [userName,setUserName] = useState(user);
    console.log(user);
    console.log(isSearch)
    console.log(itemEdit)
    return (
      <>
        {itemEdit?(
        <>
          <div className="App">
          <Salepage userName={user} selectedRow={selectedRow} setItemEdit={setItemEdit} />
           </div>
        </>):(
        <EnhancedTable userName={user} selectedRow={selectedRow} setSelectedRow={setSelectedRow} itemEdit={itemEdit} setItemEdit={setItemEdit} searchType={searchType} searchString={searchString} isSearch={isSearch} setSearch={setSearch} />)}
      </>
    );
    
    return (
      <Salepage userName />
      )
  }
  
  export default Shop;