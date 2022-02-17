import React from 'react';
import { useState } from 'react';

function TODoSubmit(props) {

    const [inputValue, setinputValue] = useState("");
    
    
    
    
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
            
            console.log("Stringify todo in ToDoSubmit: "+JSON.stringify(props.todos));           
            props.updateInput(inputValue);
            setinputValue("");
            } 
          }
        >Submit</button>
        {
          <ul>
              {Object.keys(props.todos).map(function(id) {
                
                return (
                    <li className = {props.todos[id].done?"completed":""} key={id}>
                    {props.todos[id].task} 
                    <button onClick = {() =>{
                      props.updateTodo(id, {task: props.todos[id].task, done: !props.todos[id].done});
                    }} >Done</button>
                    <button className = 'deleteTodo' onClick = {
                      ()=>{props.deleteTodo(id);
                      console.log("Stringify todo in ToDoSubmit after delete: "+JSON.stringify(props.todos));
                    }}>X</button>
                      </li>
                )
            })}
          </ul>  
        }               
        
        </>
    )
  }

export default TODoSubmit;