import React from 'react';
import Card from './Card';


const CardList = ({ cards, handleChoice, choiceOne, choiceTwo }) => {
  

  return (

    <div className="card-grid">

      {cards.map(card => (
        <Card key={card.id} card={card} handleChoice={handleChoice} 
        flipped={card === choiceOne || card === choiceTwo || card.matched} />
      ))}

    </div>

  );

};


export default CardList;