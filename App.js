import { useEffect, useState } from 'react';
import CrossMark from './assets/download-removebg-preview.png'
import './App.css';

function App() {
  const [selectnumber , Setselectnumber] = useState(1)
  const [inputValue , SetinputValue] = useState('')
  const [thingsPacked, setThingsPacked] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [sortBy , SetsortBy] = useState('')
  useEffect(()=>{
    if(todoList.length > 0){
      const ItemPacked = todoList.filter((item) => item.packed)
      setThingsPacked(ItemPacked)
    }
  },[todoList])

  const addItemtoList = ()=>{
    if(inputValue){
      const newitem = {
        text : `${selectnumber} ${inputValue}`,
        packed : false
      }
      setTodoList([...todoList,newitem])
      SetinputValue('')
    }
  }

  // delete all item ofn todo list
  const DeleteTodoList = ()=>{
    const confirm = window.confirm('Are you sure you want to delete all items');
    if(confirm){
      setTodoList([])
    }
  }

  // fuction to sort the list of input order 
  function setInputOrder(){
    const sortedlist = [...todoList].sort((a,b)=>{
      // extract number from text and compare them 
      const numA = parseInt(a.text.split(' ')[0]);
      const numB = parseInt(b.text.split(' ')[0]);
      return numA - numB;
    })
    setTodoList(sortedlist)
    SetsortBy('Sort by input order')
  }

  // fuction to sort the list by description
  function setdescription(){
    const sortedlist = [...todoList].sort((x,y)=>{
      const keyX = x.text.split(' ').slice(1).join(' ')
      const keyY = y.text.split(' ').slice(1).join(' ')
      return keyX.localeCompare(keyY)
    })
    setTodoList(sortedlist)
    SetsortBy('Sort by Description')
  }

  // fuction to sort the list by packed status
  function setpackedstatus(){
    const sortedlist = [...todoList].sort((a,b)=>{
      if(a.packed && !b.packed) return -1;
      if(!a.packed && b.packed) return 1;
      return 0 ;
    })
    setTodoList(sortedlist)
    SetsortBy('Sort by Packed Status')
  } 

  function handlesortchange(e){
    const selectedSort = e.target.value;
    if(selectedSort === 'Sort by input order'){
      setInputOrder();
    }else if(selectedSort === 'Sort by Description'){
      setdescription()
    }else if(selectedSort === 'Sort by Packed Status'){
      setpackedstatus()
    }else{
      SetsortBy(selectedSort)
    }

  }
  return (
    <div className="App">
      <div className='Header'>
      <h1>Todo App Using ReactJs</h1>
      </div>
      <div>

      <div className='subHeaderinputarea'>
      <h5 style={{fontSize:'1.1rem'}} className='text'>
        What do you need for your 😻 trip?
      </h5>
      <select className='first-select' onChange={(e) => Setselectnumber(e.target.value)} value={selectnumber}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
        <option value='11'>11</option>
        <option value='12'>12</option>
        <option value='13'>13</option>
        <option value='14'>14</option>
        <option value='15'>16</option>
        <option value='17'>17</option>
        <option value='18'>18</option>
        <option value='19'>19</option>
        <option value='20'>20</option>
      </select>
      <input value={inputValue} onChange={(e)=> SetinputValue(e.target.value)} type='text' placeholder='Item...'/>
      <button onClick={()=> addItemtoList()} className='add-btn'>Add</button>
      </div>
      <div className='main'>
      {todoList.map((item,index)=>{
        return(
          <div key={index} className={item.packed ? 'packed' : ''} style=       {{textDecoration: item.packed ? 'line-through' : 'none'}}>
            <input style={{marginRight:'5px',}} type='checkbox' onChange=
            {()=>{
              const Updatelist = [...todoList];
              Updatelist[index].packed = !Updatelist[index].packed;
              setTodoList(Updatelist)
            }} />
            <span style={{fontSize:'22px'}}>{item.text}</span>
            <img className='cross-img' 
            onClick={()=> { 
              const Updatelist = [...todoList]; 
              Updatelist.splice(index,1)
              setTodoList(Updatelist)  
            }} 
            src={CrossMark}  alt='crossimg' />
            </div>
          )
        })}
      </div>
      <div className='footer'>
        <div className='sortingparrt'>
            <select className='sorting' value={sortBy} onChange={handlesortchange}>
              <option value='Sort by input order'>Sort by input order</option>
              <option value='Sort by Description'>Sort by Description</option>
              <option value='Sort by Packed Status'>Sort by Packed Status</option>
            </select>
            <button className='clear-btn' onClick={()=> DeleteTodoList()}>Clear Item</button>
        </div>
        <p>You have {todoList.length} item on your list, & you already packed  {thingsPacked.length} ({((thingsPacked.length / todoList.length) * 100).toFixed(2)}%) </p>
      </div>
    </div>
        </div>
    );
}

export default App;
