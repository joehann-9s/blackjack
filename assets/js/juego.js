/*
    2C Clubs / Treboles
    2D Diamonds / Diamantes
    2H Hearts / Corazones
    2S Spades / Espadas
    
*/

let deck = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];

let playerScore = 0,
  computerScore = 0;

// HTML references
const btnRequest = document.querySelector("#btnRequest");
const btnStop = document.querySelector("#btnStop");
const btnNewGame = document.querySelector("#btnNewGame");

const divPlayerCards = document.querySelector("#player-cards");
const divComputerCards = document.querySelector("#computer-cards");

const htmlScore = document.querySelectorAll("small");
// Create new deck
const createDeck = () => {
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
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

createDeck();

// Allow take a card from the deck
const requestCard = () => {
  if (deck.length === 0) {
    throw "Deck is empty";
  }
  const card = deck.pop();
  return card;
};

const valueCard = (card) => {
  const valueCard = card.substring(0, card.length - 1);
  return isNaN(valueCard) ? (valueCard === "A" ? 11 : 10) : valueCard * 1;
};

// Computer turn
const computerTurn = (minScore) => {
  do {
    const card = requestCard();

    computerScore = computerScore + valueCard(card);
    htmlScore[1].innerHTML = computerScore;

    const imgCard = document.createElement("img");
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add("blackjack-card");
    divComputerCards.append(imgCard);

    if (minScore > 21) {
      break;
    }
  } while (computerScore < minScore && minScore <= 21);

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
  }, 10);
};

// Events
btnRequest.addEventListener("click", () => {
  const card = requestCard();
  console.log(card);

  playerScore = playerScore + valueCard(card);
  htmlScore[0].innerHTML = playerScore;

  const imgCard = document.createElement("img");
  imgCard.src = `assets/cards/${card}.png`;
  imgCard.classList.add("blackjack-card");
  divPlayerCards.append(imgCard);

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
  computerTurn(playerScore);
});

btnNewGame.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = createDeck();
    playerScore = 0;
    computerScore = 0;

    htmlScore[0].innerText = 0;
    htmlScore[1].innerText = 0;

    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnRequest.disabled = false;
    btnStop.disabled = false;

});
