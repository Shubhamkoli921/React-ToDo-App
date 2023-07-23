// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { BiCheck } from 'react-icons/bi'

function App() {
  const [isCompleteScreen, setisCompleteScreen] = useState(false);
  const [alltodos, setTodos] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);


  const handleSubmit = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoarr = [...alltodos];
    updatedTodoarr.push(newTodoItem);
    setTodos(updatedTodoarr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoarr));
  }

  
  const handleDelete = (index) => {
    let reducedTodo = [...alltodos];
    reducedTodo.splice(index);
    setTodos(reducedTodo);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
  }

  const handleComplete=(index)=>{
    let now = new Date();
    let dd =now.getDate();
    let mm=now.getMonth()+1;
    let yy=now.getFullYear();
    let hr=now.getHours();
    let min=now.getMinutes();
    let sec=now.getSeconds();
    let completedOn = dd + '-' +mm+'-'+yy+' at '+hr+':'+min+':'+sec; 

    let filteredItem={
      ...alltodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  }

  const handleDeletecompleted=(index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);
    setCompletedTodos(reducedTodo);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
  }
  
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodo) {
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  }, [])

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setTitle(e.target.value)} placeholder="What is the task?" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setDescription(e.target.value)} placeholder="What is the Description?" />
          </div>
          <div className="todo-input-item">
            <button className="primaryBtn" onClick={handleSubmit} type="button">Add</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`isCompleteScreen ${isCompleteScreen === false && 'active'}`} onClick={() => setisCompleteScreen(false)}>ToDo</button>
          <button className={`isCompleteScreen ${isCompleteScreen === true && 'active'}`} onClick={() => setisCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">
          {isCompleteScreen===false && alltodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <MdDeleteOutline className='icon' onClick={() => handleDelete(index)} />
                  <BiCheck onClick={()=>handleComplete(index)} className='check-icon' />
                </div>
              </div>
            );
          })}

          {isCompleteScreen===true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On : {item.completedOn}</small></p>
                </div>
                <div>
                  <MdDeleteOutline className='icon' onClick={() => handleDeletecompleted(index)} />
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
