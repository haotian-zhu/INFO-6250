import React from 'react'

function Prompt(props) {
    const givePrompt = (inputValue) => {
        
            if(inputValue === "dog" || !inputValue){
              return ("***Username Can Not be Dog Or Null***");
            }else{
              return "";
            }
    }
    return (
        <div>
            <span> {givePrompt(props.passInValue)}</span>
        </div>
    )
}

export default Prompt
