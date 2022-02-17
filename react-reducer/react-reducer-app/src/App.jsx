import {useEffect, useReducer,createContext} from 'react';

import LoginPage from './components/LoginPage';
import Header from './components/Header';
import ToDoPage from './components/ToDoPage';
import LogOut from './components/LogOut';
import './App.css';

const {ACTIONS,reducer} = require("./Reducer");
const { fetchAddTodo,
        fetchDeleteTodo,
        fetchLogin,
        fetchLogout,
        fetchSession,
        fetchTodos,
        fetchUpdateTodo
      } = require("./service.js");

export const Context = createContext({});

function App() {
  const [state, dispatch] = useReducer(reducer, {toDolist: {}, isLoggedIn: false});
  
  useEffect(() => {
    fetchSession()
      .then(
        fetchTodos()
    .then(results =>
      { if(results){
 
        dispatch({type: ACTIONS.LOGIN});
      }else{       
       
        dispatch({type: ACTIONS.LOGOUT});
      }
      dispatch({type: ACTIONS.SETTODOS, payload: results}); 
    })
    .catch(() => 
      
      {dispatch({type: ACTIONS.LOGOUT})}
      )
          )
      .catch(e => {
        //FIXME
        console.log(e);
      }) 
    
  }, [state.isLoggedIn, state.toDolist])

  return (
    <div className = 'login'>
      <Header className="app-header" title = "Made by Haotian Zhu"/>

      {!state.isLoggedIn &&<div className = "logInDisplay">
            <LoginPage
              updateInput = {userName => { 
                fetchLogin(userName)
                .then(console.log('userName:',userName))
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
                
              }}
              changeStatus = {() => dispatch({type: ACTIONS.LOGIN})}/>
            <p>***UserName cannot be dog or null***</p>
            
      </div>}

      {state.isLoggedIn && <div className = "toDoDisplay">
          <Context.Provider value = {state.toDolist}>
            <ToDoPage
              updateInput = {toDo => {
                
                fetchAddTodo(toDo)
                .then( toDo => {    
                      console.log('todo returned from fetch', toDo);
                      dispatch({action: ACTIONS.ADDTODO, dispatch: toDo});
                      
                })
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
              }}
              todos = {state.toDolist}
              changeStatus = {isLoggedIn => state.setIsLoggedIn(isLoggedIn)}
              updateTodo = { (id, update) =>{
              
                fetchUpdateTodo(id, update)
                .then(() => {
                  const tmpTodos = {...state.toDolist};
                  tmpTodos[id].done = !tmpTodos[id].done;
                  dispatch({action: ACTIONS.SETTODOS, dispatch: tmpTodos});
                  
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
                  const tmpTodos = { ...state.toDolist };
                  delete tmpTodos[id];
                  dispatch({action: ACTIONS.SETTODOS, dispatch: tmpTodos})                 
                })
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
              }}
              />
              </Context.Provider>
            
            <LogOut changeStatus = {() => 
              
              {dispatch({type: ACTIONS.LOGOUT});
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

