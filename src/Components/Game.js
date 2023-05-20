import React, {useEffect, useState} from "react";
import '@picocss/pico';
import '../Styles/Game.css';
import uniqid from 'uniqid';

function Game(){
    const [level, setLevel] = useState(1);
    const [progress, setProgress] = useState(0);

    const [dogs, setDogs] = useState([]);

    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const updateGameStatus = () => {
        let counter = 0;
        for(const i of dogs){
            if(i.clicked === true){
                counter++;
            }
        }
        if(counter === dogs.length){
            setLevel(level + 1);
            setCurrentScore(currentScore + 1);   
        } else {
            setProgress(counter);
            setCurrentScore(currentScore + 1);
        }
    }

    const returnDogName = (e) => {
        console.log(e.target.nextSibling.textContent);
        for(const i of dogs){
            if(i.name === String(e.target.nextSibling.textContent) && i.clicked === false){
                i.clicked = true;
            } else if(i.name === String(e.target.nextSibling.textContent) && i.clicked === true){
                bestScore < currentScore ? setBestScore(currentScore) : null;
                setLevel(1);
            } 
        }
        updateGameStatus();
    }

    const randomKey = (list) => {
        const keys = Object.keys(list);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];
    }
    const getImageOfDog = (dogObj) => {
        fetch(`https://dog.ceo/api/breed/${dogObj.name}/images`)
        .then(res => res.json())
        .then(data => {
            setDogs(prevDogs => prevDogs.map(dog => dog.name === dogObj.name ? {...dog, image: data.message[randomKey(data.message)], clicked: false} : dog))
        })
    }

    // function shuffle(array) {
    //     let currentIndex = array.length,  randomIndex;
      
    //     // While there remain elements to shuffle.
    //     while (currentIndex != 0) {
      
    //       // Pick a remaining element.
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex--;
      
    //       // And swap it with the current element.
    //       [array[currentIndex], array[randomIndex]] = [
    //         array[randomIndex], array[currentIndex]];
    //     }
      
    //     return array;
    //   }
      
    //   // Used like so
    //   var arr = [2, 11, 37, 42];
    //   shuffle(arr);
    //   console.log(arr);

    useEffect(() => {
        setCurrentScore(0);
    }, [bestScore])

    useEffect(() => {
        const getDogs = () => {
            let dogArray = [];
            fetch("https://dog.ceo/api/breeds/list/all")
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i < level; i++){
                    let dogBreed = randomKey(data.message);
                    let dogObject = {name: dogBreed, image: "", clicked: false };
                    getImageOfDog(dogObject);
                    dogArray.push(dogObject);
                }
                console.log(dogArray);
                setDogs(dogArray);
            })
        }
        getDogs();
        setProgress(0);
    }, [level]);

    const renderDogImages = () => {
        return dogs.map((dog) => {
            return(
                <div className="dogBox" key={uniqid()}>
                    <img src={dog.image} onClick={returnDogName}></img>
                    <p className="dogName">{dog.name}</p>
                </div>
            ); 
        })
    }
    
    return (
        <div>
            <nav>
                <h2><u>- LEVEL {level} -</u></h2>
            </nav>

            <section>
                <div id="gameBoard">
                    {renderDogImages()}
                </div>
            </section>

            <section className="scores">
                <h6 id="currentScore">CURRENT SCORE: {currentScore}</h6>    
                <h6 id="bestScore">BEST SCORE: {bestScore}</h6>
            </section>

            <footer>
                <h6>Progress</h6>
                <progress value={progress} max={level}></progress>
            </footer>
        </div>
    )
}

export default Game;