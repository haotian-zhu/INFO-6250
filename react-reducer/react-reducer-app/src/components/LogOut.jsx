import React from 'react';

function LogOut(props) {
    return (
        <div>
           <button type = "button" onClick = {
           () => {props.changeStatus();}
           }>LogOut</button>
        </div>
    )
}

export default LogOut;
