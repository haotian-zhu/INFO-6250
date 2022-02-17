"use strict";
const web = {
    webPage: function(data) {
      
      return `
        <!doctype html>
        <html>
          <head>
            <title>Main Page Login</title>
          </head>
          <style>
          body {background-color:white;}
          h1   {color: green;}
          span {
          color: red;
          font-family: courier;
          font-size: 140%;
          }
          p{ color: black;
                font-size: 110%;
           }
          </style>
  
          <body>
            <h1>User Login</h1>
            <div id="display">

              
              ${web.loginPage(data)}
              
              
            </div>
          </body>
        </html>
    `;
    },
    

    loginPage: function(data) {
       return `
       <form action = "/login" id = "inputUsername", method = "POST">`
       +`<button type = "submit">Enter</button>`
       +`<input type = "text" name = "unInput" value = "" placeholder = "Enter Username">`
       + `<p><label id = "reminder">Please enter a valid username(numbers or integers only)</label></p>`
       +`</form>`
    },
   dataPage: function(sw){
    return `<form action = "/storedWord" id = "inputStoredword", method = "POST">`
    +`<button type = "submit">Change</button>`
    +`<input type = "text" name = "swInput" value = "" placeholder = "Enter stored word">`
    +`<label for = "reminder">${sw}</label>`
    + `<p><button type = "submit">Logout</button></p>`
    +`</form>`
   }
  
    
};
module.exports = web;