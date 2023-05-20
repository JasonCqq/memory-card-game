import React, {useEffect, useState} from "react";
import '@picocss/pico';
import '../Styles/Game.css';
import uniqid from 'uniqid';

function Game(){
    const [level, setLevel] = useState(3);
    const [progress, setProgress] = useState(0);

    const [dogs, setDogs] = useState([]);
    const [dogsImage, setDogsImage] = useState([]);

    const randomKey = (list) => {
        const keys = Object.keys(list);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];
    }
    const getImageOfDog = (breed) => {
        fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(res => res.json())
        .then(data => {
            setDogsImage(prevDogsImage => [...prevDogsImage, data.message[randomKey(data.message)]]);
        })
    }

    useEffect(() => {
        const getDogs = () => {
            let dogArray = [];
            fetch("https://dog.ceo/api/breeds/list/all")
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i < level; i++){
                    dogArray.push(randomKey(data.message));
                }
                setDogs(dogArray);
            })
        }
        getDogs();
    }, [level]);

    useEffect(() => {
        dogs.forEach(dog => getImageOfDog(dog));
    }, [dogs])

    const renderDogImages = dogs.map((dog) => {
        return(
            <div className="dogBox" key={uniqid()}>
                <img height="200px" width="200px" src={dogsImage[dogs.indexOf(dog)]}></img>
                <p className="dogName">{dog}</p>
            </div>
        ); 
    });
    

    return (
        <div>
            <nav>
                <h2><u>- LEVEL {level} -</u></h2>
            </nav>

            <section>
                <div id="gameBoard">
                    <div>{renderDogImages}</div>
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