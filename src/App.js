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

  return (
    <div>
      {showMainscreen ? (<Mainscreen startButtonClick={startButtonClick}/>) : <Game/>}
    </div>
  );
}

export default App;
