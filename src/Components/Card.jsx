import React from 'react';


const Card = ({ card, handleChoice, flipped }) => {

  const handleClick = () => {
    handleChoice(card); 

  };

  return (

    <div className="card">

      <div className={flipped ? "flipped" : ""}>

        <img className="front" src={card.src} alt="card front" />
        <img className="back" src={process.env.PUBLIC_URL + "/CardImages/cover.png"} onClick={handleClick} alt="card back" />

      </div> 

    </div>

  );

};


export default Card;