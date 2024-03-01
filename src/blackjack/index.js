import _ from 'underscore';

import { createDeck, requestCard, createCard, acumulatePoints, computerTurn } from './usecases';


(() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  let playersPoints = [];

  // HTML references
  const btnRequest = document.querySelector("#btnRequest"),
    btnStop = document.querySelector("#btnStop"),
    btnNewGame = document.querySelector("#btnNewGame");

  const  divPlayerCards = document.querySelectorAll(".divCards"),
    htmlScore = document.querySelectorAll("small");


  // Init game
  const initGame = (numPlayers = 2) => {
    deck = createDeck(types, specials);

    playersPoints = [];
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
    }
    
    htmlScore.forEach( elem => elem.innerText = 0);
    divPlayerCards.forEach( elem => elem.innerHTML = '');

    btnRequest.disabled = false;
    btnStop.disabled = false;
    
  };


  // Events
  btnRequest.addEventListener("click", () => {
    const card = requestCard(deck);
    const playerScore = acumulatePoints(card, 0,playersPoints,htmlScore);

    createCard(card, 0,divPlayerCards);
    


    if (playerScore > 21) {
      console.warn("You lose the game");
      btnRequest.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerScore, deck,playersPoints, htmlScore, divPlayerCards);

    } else if (playerScore === 21) {
      console.warn("Blackjack");
      btnRequest.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerScore, deck,playersPoints, htmlScore, divPlayerCards);

    }

  });


  btnStop.addEventListener("click", () => {
    btnRequest.disabled = true;
    btnStop.disabled = true;
    computerTurn(playersPoints[0], deck,playersPoints, htmlScore, divPlayerCards);

  });

  btnNewGame.addEventListener("click", () => {
    initGame();
    
  });

  return {
    newGame : initGame
  };
  
})();
