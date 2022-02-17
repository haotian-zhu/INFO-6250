function isValid(userName){
    if(userName != "" && userName != "dog"){
    if (userName.match(/^\d+$/)|| userName.match(/^[A-Z]+$/i)){
        return true;
    }else return false;
    } return false;

}
const sessionList = {};
const storedWordList = {};
function addStoredWord({un,sw}) {

  
  
   storedWordList[un] = sw;
}
   
const data = {
    isValid,
    sessionList,
    storedWordList,
    addStoredWord,
  };
module.exports = data;