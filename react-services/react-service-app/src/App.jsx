import {useState, useEffect} from 'react';
//import SubmitToDo from './components/SubmitToDo';
import LoginPage from './components/LoginPage';
import Header from './components/Header';

import ToDoSubmit from './components/ToDoSubmit';
import LogOut from './components/LogOut';
//import ToDoList from './components/ToDoList';
import './App.css';
const { fetchAddTodo,
        fetchDeleteTodo,
        fetchLogin,
        fetchLogout,
        fetchSession,
        fetchTodos,
        fetchUpdateTodo
      } = require("./service.js");
      
function App() {
   
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toDos, setToDos] = useState({});
  
  useEffect(() => {
    fetchSession()
      .then(
        fetchTodos()
    .then(results =>
      { if(results){
        console.log("results", results)
        setIsLoggedIn(true);
      }else{       
        setIsLoggedIn(false);}
        setToDos(results);
      console.log("collection from fetchTodos:",results);
    })
    .catch(() => 
      {setIsLoggedIn(false)})
          )
      .catch(e => {
        //FIXME
        console.log(e);
      }) 
    
  }, [isLoggedIn])

  return (
    <div className = 'login'>
      <Header className="app-header" title = "Made by Haotian Zhu"/>

      {!isLoggedIn &&<div className = "logInDisplay">
            <LoginPage
              updateInput = {userName => {
                setUserName(userName);
                
                fetchLogin(userName)
                .then(console.log('userName:',userName))
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
                
              }}
              changeStatus = {isLoggedIn => setIsLoggedIn(isLoggedIn)}/>
            <p>***UserName cannot be dog or null***</p>
            
      </div>}

      {isLoggedIn && <div className = "toDoDisplay">
            <ToDoSubmit
              updateInput = {toDo => {
                
                fetchAddTodo(toDo)
                .then( toDo => {    // Notice!  Different value for "toDo" here
                      console.log('todo returned from fetch', toDo) 
                      setToDos({ ...toDos, [toDo.id]: toDo });
                })
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
              }}
              todos = {toDos}
              changeStatus = {isLoggedIn => setIsLoggedIn(isLoggedIn)}
              updateTodo = { (id, update) =>{
              
                fetchUpdateTodo(id, update)
                .then(() => {
                  const tmpTodos = {...toDos};
                  tmpTodos[id].done = !tmpTodos[id].done;
                  setToDos(tmpTodos);
                })
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
              }}
              deleteTodo = {id =>{
                
                console.log("id todo to be deleted: ",id);
                fetchDeleteTodo(id)
                .then(() => {
                  const tmpTodos = { ...toDos };
                  delete tmpTodos[id];
                  setToDos(tmpTodos);})
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
              }}
              />
            
            <LogOut changeStatus = {status => 
              {setIsLoggedIn(status);
              fetchLogout()
              .then(console.log("User Logged out"))
              .catch(e => {
                //FIXME
                console.log(e);
              })
              }}/>
            
      </div>}
   </div>
  );
}

export default App;
