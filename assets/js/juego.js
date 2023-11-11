const myModule = (() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  let playersPoints = [];

  // HTML references
  const btnRequest = document.querySelector("#btnRequest"),
    btnStop = document.querySelector("#btnStop"),
    btnNewGame = document.querySelector("#btnNewGame");

  const divPlayerCards = document.querySelectorAll(".divCards"),
    htmlScore = document.querySelectorAll("small");


  // Init game
  const initGame = (numPlayers = 2) => {
    deck = createDeck();

    playersPoints = [];
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
    }
    
    htmlScore.forEach( elem => elem.innerText = 0);
    divPlayerCards.forEach( elem => elem.innerHTML = '');

    btnRequest.disabled = false;
    btnStop.disabled = false;
    
  };

  // Create new deck
  const createDeck = () => {

    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }

    for (let type of types) {
      for (let spe of specials) {
        deck.push(spe + type);
      }
    }
    return _.shuffle(deck);
  };

  // Allow take a card from the deck
  const requestCard = () => {
    if (deck.length === 0) {
      throw "Deck is empty";
    }
    return deck.pop();
  };

  const valueCard = (card) => {
    const valueCard = card.substring(0, card.length - 1);
    return (isNaN(valueCard)) ?
            (valueCard === "A") ? 11 : 10
            : valueCard * 1;
  };

  // Turn: 0 = 1st player y the last is the computer
  const acumulatePoints = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + valueCard(card);
    htmlScore[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  // Create card
  const createCard = (card, turn) => {

    const imgCard = document.createElement("img");
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add("blackjack-card");
    divPlayerCards[turn].append(imgCard);
  };
  // Who win
  const determinedWinner = () => {

    const [ minScore, computerScore] = playersPoints;

    setTimeout(() => {
      if (computerScore === minScore) {
        alert("Equals");
      } else if (minScore > 21) {
        alert("Computer wins");
      } else if (computerScore > 21) {
        alert("You win");
      } else {
        alert("Computer wins");
      }
    }, 100);
  }


  // Computer turn
  const computerTurn = (minScore) => {
    let computerScore = 0;

    do {
      const card = requestCard();
      computerScore = acumulatePoints(card, playersPoints.length - 1);
      createCard( card, playersPoints.length - 1);

   
    } while ((computerScore < minScore) && (minScore <= 21));

    determinedWinner(); 
  };



  // Events
  btnRequest.addEventListener("click", () => {
    const card = requestCard();
    const playerScore = acumulatePoints(card, 0);

    createCard(card, 0);
    


    if (playerScore > 21) {
      console.warn("You lose the game");
      btnRequest.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerScore);

    } else if (playerScore === 21) {
      console.warn("Blackjack");
      btnRequest.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerScore);
    }

  });


  btnStop.addEventListener("click", () => {
    btnRequest.disabled = true;
    btnStop.disabled = true;
    computerTurn(playersPoints[0]);
  });

  btnNewGame.addEventListener("click", () => {
    initGame();
    
  });

  return {
    newGame : initGame
  };
  
})();
