import React from 'react';
import { useState } from 'react';
//import Hint from './Hint';
function Submission(props) {

    const [inputValue, setinputValue] = useState('');
    
    return (    
        <>  
          <p></p>
          <span>Make Guess</span>
          <input 
          value = {inputValue}
          onInput={ (e) => setinputValue(e.target.value) }
          />
          <button 
          type="button" 
          onClick={ () => { 
            
            props.updateInput(inputValue) 
            setinputValue("");
            } 
          }
        >Enter</button>
        </>
    )
  }

export default Submission;
