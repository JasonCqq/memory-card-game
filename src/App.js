import React, {useState, useEffect} from 'react';
import './Styles/App.css';
import '@picocss/pico';
import Mainscreen from './Components/Mainscreen';

function App() {

  const [showMainscreen, setShowMainscreen] = useState(true);

  const startButtonClick = () => {
    setShowMainscreen(false);
  }

  //We'll be using the theme of DOGSSS
  // useEffect(() => {
  //   fetch("https://dog.ceo/api/breeds/list/all")
  //       .then(response => response.json())
  //       .then(data => console.log(data))
  // }, [])

  return (
    <div>
      {showMainscreen ? (<Mainscreen startButtonClick={startButtonClick}/>) : "HEY"}
    </div>
  );
}

export default App;
