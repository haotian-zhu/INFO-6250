"use strict"

const express = require('express');
const app = express();
const PORT = 3000;
const uuid = require('uuid').v4;
const inventories = require('./inventories');

app.use(express.static('./public'));
app.use(express.json({limit: '10mb'}));

app.get('/', (req, res) => {

    if (res.status(200)){
        res.json("Successfully get!");
    }else(res.status(401).send("401 error"))

  }); 
app.get('/inventories',  (req, res) => {

    res.json(inventories);         

});

app.put('/item/:index', (req, res) => {

    const {index,change} = req.body;  
    inventories[index].quantity += change;
    res.json(inventories[index]);
    
});

app.post('/item', (req, res) => {
    const item = req.body; 
    
    const uid = uuid();   
    inventories[uid] = {
        itemId: uid,
        name: item.name, 
        quantity: item.quantity,
      }
    
    res.json(inventories[uid]);
    
});

app.delete('/item/:index', (req, res) => {
    const index = req.params.index;

    const target = inventories[index];
    delete inventories[index];
    res.json(target);
    
    
});

app.listen(PORT, ()=>{console.log(`Listening on http://localhost:${PORT}`)});