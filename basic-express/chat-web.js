const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Haotian's Chat</title>
        </head>
        <style>
        body {background-color:gray;}
        h1   {color: green;}
        p {
        color: red;
        font-family: courier;
        font-size: 140%;
        }
        span{ color: white;
              font-size: 110%;
         }
        </style>

        <body>
          <h1>Online Chat App</h1>
          <div id="chat-app">
            <div class="display-panel" >
              <span class="messages"> Users online:  </span>
              ${chatWeb.getUserList(chat)}
              <span class="messages"> chatbox </span>
              ${chatWeb.getMessageList(chat)}
            </div>
            <div id = "outgoing">
            ${chatWeb.getOutgoing(chat)}
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {

    return `<ol class="messages">` +
    Object.values(chat.messages).map( message => `
      <li>
        <div class="message">
          <span class="messages">${message.sender}</span>
          <span class="messages">: </span>
          <p class="messages">${message.text}</p>
        </div>
      </li>
    `).join('') +
    `</ol>`;

  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function(chat) {
    // Fill in!
   return `<form action = "/chat" id = "inputForm", method = "POST">`
   //+`<span class="username">Haotian</span>`
   +`<input type = "text" name = "messageInput" value = "" placeholder = "Enter message to send">`
   +`<button type = "submit">send</button>`
   +`</form>`
}
};
module.exports = chatWeb;
