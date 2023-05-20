import React, {useState, useEffect} from 'react';
import './Styles/App.css';
import '@picocss/pico';
import Mainscreen from './Components/Mainscreen';
import Game from './Components/Game';

function App() {

  const [showMainscreen, setShowMainscreen] = useState(true);

  const startButtonClick = () => {
    setShowMainscreen(false);
  }

  // //Dog list as length
  // const randomKey = (list) => {
  //     const keys = Object.keys(list);
  //     const randomIndex = Math.floor(Math.random() * keys.length);
  //     return keys[randomIndex];
  // }

  // const getDogImage = () => {
  //   fetch("https://dog.ceo/api/breeds/list/all")
  //   .then(response => response.json())
  //   .then(data => {
  //     let selectedBreed = randomKey(data.message);
  //     let url = `https://dog.ceo/api/breed/${selectedBreed}/images`;
  //     return `Breed: ${selectedBreed} URL: ${url}`;
  //   })
  // }
  
  //We'll be using the theme of DOGSSS
  useEffect(() => {
  }, []);

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div>
      {showMainscreen ? (<Mainscreen startButtonClick={startButtonClick}/>) : <Game/>}
    </div>
  );
}

export default App;
