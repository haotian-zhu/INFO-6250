const express = require('express');
const app = express();
const PORT = 3000;

const uid = require('uuid').v4;
const cookieParser = require('cookie-parser');
const web = require('./web'); 
const data = require('./data');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    
    console.log("This is sid: " + sid);

    if(!sid){
      res.clearCookie(sid);
      res.send(web.webPage());
    }
    res.send(web.loginPage(data));

  });
    
  
app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const unInput = req.body.unInput;
    if (data.isValid(unInput)){
        const sid = uid();
               
        const {unInput} = req.body;
        data.sessionList[sid] = unInput;
        console.log("username: " + data.sessionList[sid]+" and it's sid: " +sid);
        res.cookie(data.sessionList[sid], sid);
        data.addStoredWord(req.body);
        //res.redirect('/');
        /* data.storedWordList[unInput] = swInput;
        console.log("stored word: " + swInput); */
        res.send(web.dataPage(data));
        

    }else {
        
        res.status(401).send(`401 Error <br/>`
        +`you entered ${unInput} <br/>`
        + `username can't be empty or dog. it must be numbers only or letters only. <br/>`
        + `Please go back to http://localhost:3000`);
    }

  },);

  app.post('/storedWord', (req,res) =>{
    const sid = req.cookies.sid;
    const un = data.sessionList[sid];
    const sw = req.body.swInput;
    data.storedWordList[un] = sw;
    const {swInput} = req.body;
    res.send(web.dataPage(sw));
  })



app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

