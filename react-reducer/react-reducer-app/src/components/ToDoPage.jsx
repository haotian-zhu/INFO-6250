import React from 'react';
import { useState, useContext } from 'react';
import {Context} from '../App.jsx';
function ToDoPage(props) {

    const [inputValue, setinputValue] = useState("");
    const todolist = useContext(Context);
    return (    
        <>  
          <p></p>
          <span>Add Something To Do</span>
          <input 
          value = {inputValue}
          onInput={ (e) => setinputValue(e.target.value) }
          />
          <button 
          type="button" 
          onClick={ () => { 
            
            //console.log("Stringify todo in ToDoSubmit: "+JSON.stringify(props.todos));           
            props.updateInput(inputValue);
            setinputValue("");
            } 
          }
        >Submit</button>
        {

          <ul>
              {Object.keys(todolist).map(function(id) {
                
                return (
                    <li className = {todolist[id].done?"completed":""} key={id}>
                    {todolist[id].task} 
                    <button onClick = {() =>{
                      props.updateTodo(id, {task: todolist[id].task, done: !todolist[id].done});
                    }} >Done</button>
                    <button className = 'deleteTodo' onClick = {
                      ()=>{props.deleteTodo(id);
                      //console.log("Stringify todo in ToDoSubmit after delete: "+JSON.stringify(props.todos));
                    }}>X</button>
                      </li>
                )
            })}
          </ul>  
        }               
        
        </>
    )
  }

export default ToDoPage;