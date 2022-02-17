import React from 'react';
import compare from './compare';

function Hint(props) {
    const giveHintOnInput = (inputValue) => {
        if(inputValue.length === 0){
            return (`Please Enter a Valid Word`);
        }else if(inputValue.length !== 5){
            return (`${inputValue} is not a valid word, It should be 5 character`);
        }else if(inputValue.length === 5 &&inputValue.toUpperCase() !=="RECAT"){
            return (`Wrong guess! ${inputValue}  had ${compare("RECAT", inputValue)} letters in common`);
        }else if(inputValue.toUpperCase()=== "RECAT"){
            return (`${inputValue} is the secret word!`);

        }
    }
    
    return (
        <>
            <span> {giveHintOnInput(props.passInValue)}</span>
        </>
    )
}

export default Hint
