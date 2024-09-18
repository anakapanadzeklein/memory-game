import React, { useEffect, useState } from 'react';
import CardList from './Components/CardList';
import Header from './Components/Header';
import './App.css';




const cardImages = [
  { src: process.env.PUBLIC_URL + "/CardImages/heart.png", matched: false },
  { src: process.env.PUBLIC_URL + "/CardImages/cherry-blossom.png", matched: false },
  { src: process.env.PUBLIC_URL + "/CardImages/pink-bow.png", matched: false },
  { src: process.env.PUBLIC_URL + "/CardImages/white-bow.png", matched: false },
  { src: process.env.PUBLIC_URL + "/CardImages/star.png", matched: false },
  { src: process.env.PUBLIC_URL + "/CardImages/shell.png", matched: false },
];




const App = () => {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    

    setCards(shuffledCards);
    setTurns(0);
    setDisabled(false);

  };




  const handleChoice = (card) => {

    if (disabled) return;

    console.log("Card clicked:", card);

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };




  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true); 

      if (choiceOne.src === choiceTwo.src) {

        console.log("Match found!");

        setCards(cards => {
          return cards.map(card => {
            
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }

          });
        });

        resetTurn();


      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }

  }, [choiceOne, choiceTwo]);






  const resetTurn = () => {

    console.log("Resetting turn. Current turns:", turns);

    setChoiceOne(null);
    setChoiceTwo(null);

    setTurns(prevTurns => {
      console.log("Updated turns:", prevTurns + 1);
      return prevTurns + 1;
    });

    setDisabled(false);
  };




  useEffect(() => {
    shuffleCards()
  }, []);




  if (process.env.NODE_ENV === 'development') {
    console.log(cards, turns);
  }





  return (

    <div className="App">

      <Header />
      <button onClick={shuffleCards}>New Game</button>
      <CardList cards={cards} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo}/>

      <p> Turns: {turns} </p>

    </div>

  );

};




export default App;