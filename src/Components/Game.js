import React, {useEffect, useState} from "react";
import '@picocss/pico';
import '../Styles/Game.css'

function Game(){
    const randomKey = (list) => {
        const keys = Object.keys(list);
        const randomIndex = Math.floor(Math.random() * keys.length);
        console.log(keys[randomIndex]);
        return keys[randomIndex];
    }

    const getDogImages = (amount) => {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < amount; i++){
                let dogArray = [];
                dogArray.push(randomKey(data.message));
            }
        })
    }

    console.log(getDogImages(5));

    const [level, setLevel] = useState(1);
    const [progress, setProgress] = useState(0);

    return (
        <div>
            <nav>
                <h2><u>- LEVEL {level} -</u></h2>
            </nav>

            <section>
                <div id="gameBoard">

                </div>
            </section>

            <section className="scores">
                <h6 id="currentScore">CURRENT SCORE: 0</h6>    
                <h6 id="bestScore">BEST SCORE: 0</h6>
            </section>

            <footer>
                <h6>Progress</h6>
                <progress value={progress} max="100"></progress>
            </footer>
        </div>
    )
}

export default Game;