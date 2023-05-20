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
        if(counter === dogs.length - 1){
            setLevel(level + 1);
            setCurrentScore(currentScore + 1);   
        } else {
            setProgress(counter + 1);
            setCurrentScore(currentScore + 1);
        }
    }

    const returnDogName = (e) => {
        let skip = false;
        for(const i of dogs){
            if(i.name !== String(e.target.nextSibling.textContent)){
                continue;
            }

            if(i.clicked === false){
                                shuffle(dogs);
                setDogs(prevDogs => prevDogs.map(dog => dog.name === i.name ? {...dog, clicked: true} : dog));
                console.log(i);
            } else if(i.clicked === true){
                if(bestScore <= currentScore){
                    setBestScore(currentScore);
                }
                setCurrentScore(0);
                skip = true;
                setLevel(1);
            } 
        }

        if(skip === false){
            updateGameStatus();
        }
    }

    const shuffle = (array) => {
        console.log(array);
        let currentIndex = array.length, tempValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * array.length);
            currentIndex -= 1;
            tempValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempValue;
        }
        console.log(array);
        setDogs(array);
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