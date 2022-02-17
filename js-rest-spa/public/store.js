"use strict";

(function iife(){
    
    const listEl = document.querySelector('#inventory-app .inventories');
    const itemInput = document.querySelector('#inventory-app input');
    const addButton = document.getElementById('add');
    
    function getInventories(){
       fetch('/inventories',{
        credentials: 'include',
        method: 'GET',
        })
        .then( res => { 
             
            return res.json();
        })
        .then( parsed =>{
            
            render(parsed);
            
        })
        .catch(
            e =>{
                console.log(e);
            }); 
    }    
    function render(inventoryList){
        listEl.innerHTML = '';

        for (const item in inventoryList){
            var el = document.createElement("li");
            el.innerHTML = `
            <span class="inventory" data-index="${inventoryList[item].itemId}">${inventoryList[item].name}</span>
            <button class="minus" ${inventoryList[item].quantity === 0? "disabled":""} data-index="${inventoryList[item].itemId}">-</button>
            <span class="quantity" data-index="${inventoryList[item].itemId}">${inventoryList[item].quantity}</span>
            <button class="plus" data-index="${inventoryList[item].itemId}">+</button>
            <span class="delete" data-index="${inventoryList[item].itemId}">X</span>
            `;    
            listEl.appendChild(el);
            addButton.disabled = !itemInput.value;
          }
          
    }
    
 
    function fetchChangeQuantity(data){
        return fetch(`item/:index`,{
            credentials: 'include',
            method: 'PUT',
            headers: new Headers({
                'content-type': 'application/json',
              }),
            body: JSON.stringify( data ),   
            })
            .then(
            res =>{
                if(!res.ok){
                  console.log('error, response not OK');
                }
                data = res.json();
                
            })             
            .catch(error =>{
            console.log(error);
            })
    }

    function addAbilityToChangeQuantity(){
        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('plus')) {
            return;
            }  
            const index = e.target.dataset.index;                      
            const change = 1;
            const data = {
                index,
                change
            }
            fetchChangeQuantity(data);
            getInventories();
        });

    
        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('minus')) {
                return;
            }
            const index = e.target.dataset.index;                      
            const change = -1;
            
            const data = {
                index,
                change
            }
            fetchChangeQuantity(data);
            getInventories();
            });
    }
    
    function disableButtonIfNoInput() {
        itemInput.addEventListener('input', () => {
            addButton.disabled = !itemInput.value;
            
            });
        
      }
            
        
    
    function fetchAddItem(item){
        return fetch('/item',{
            credentials: 'include',
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
                      
                }),
            body: JSON.stringify( item ),   
            })
            .then(
            res =>{
                if(!res.ok){
                    console.log('error, response not OK');
                }
                
                
            })            
            .catch(error =>{
            console.log(error);
            })
    }
    function addAbilityToAddItems() {
        addButton.addEventListener('click', (e) => {

            const newItem = {
                itemId: '',
                name: itemInput.value,
                quantity: 0,
            };
            fetchAddItem(newItem);
        
            itemInput.value = '';
            
            getInventories();
        });
        }
    function fetchDeleteItem(index){
        return fetch(`/item/${index}`,{
            credentials: 'include',
            method: 'DELETE',
                     
            body:  JSON.stringify(index) ,   
            })
            .then(
            res =>{
                if(!res.ok){
                    console.log('error, response not OK');
                }               
                return res.json();
            })            
            
    }
    function addAbilityToDeleteItems(){
        listEl.addEventListener('click', (e) => {
      
            if(!e.target.classList.contains('delete')) {
              return;
            }
      
            const index = e.target.dataset.index; 
            fetchDeleteItem(index)
            .catch(error =>{
                console.log(error);
                }); 
            getInventories();
          });
    }
    addAbilityToDeleteItems();
    addAbilityToAddItems()
    disableButtonIfNoInput();
    addAbilityToChangeQuantity();
    getInventories();
})()