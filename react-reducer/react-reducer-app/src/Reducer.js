const ACTIONS = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    SETTODOS: 'setTodos',
    ADDTODO: 'addTodo',
  }  
function reducer(state, action){
    switch(action.type){
      case ACTIONS.LOGIN:
        return {...state, isLoggedIn: true}; 
      case ACTIONS.LOGOUT:
        return {...state, isLoggedIn: false};
      case ACTIONS.SETTODOS:
          //console.log(action.payload);
          return {...state, toDolist: action.payload};
      case ACTIONS.ADDTODO:
        const newToDolist = {...state.toDolist, [action.payload.id]:action.payload};
        console.log("inACTIONS.ADDTODO: ",newToDolist);
        return {...state, toDolist: newToDolist};
      default:
        return state;
    }

}
const Reducer = {ACTIONS,
    reducer}

module.exports = Reducer;
