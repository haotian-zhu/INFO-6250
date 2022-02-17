import React from 'react';
import { useState } from 'react';

function LoginPage(props) {
    
    const [inputValue, setinputValue] = useState("");
    
    return (    
        <>  
          <p></p>
          <span>Enter User Name</span>
          <input 
          value = {inputValue}
          onInput={ (e) => setinputValue(e.target.value) }
          />
          <button 
          type="button" 
          onClick={ () => { 
            props.changeStatus(true);
            props.updateInput(inputValue);
            setinputValue("");
            } 
          }
        >Submit</button>
       <p></p>
        </>
    )
  }

export default LoginPage;