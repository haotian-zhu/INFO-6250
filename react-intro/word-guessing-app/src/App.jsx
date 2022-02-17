
import './App.css';
import Header from './components/Header';
import Submission from './components/Submission';
import Hint from './components/Hint';
import { useState } from 'react';
function App() {
  const [guess, setGuess] = useState("");
  function showGuess ({guess}){
      console.log(guess);
      if(guess.length !== 0){
        return (`Your last Guess was ${guess}`);
      }else{
        return ("");
      }
  }
  return (

    <div className="app">
      <Header className="app-header" title = "Made by Haotian Zhu"/>
        
        <div className = "display">
          <p>{showGuess({guess})}</p>
          <Hint passInValue = {guess}/>
          <Submission 
            updateInput = {guess => setGuess(guess)}
          />     
          </div>
      
      
    </div>
  );
}
export default App;