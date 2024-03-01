  // Create card
  export const createCard = (card, turn, divPlayerCards) => {

    const imgCard = document.createElement("img");
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add("blackjack-card");
    divPlayerCards[turn].append(imgCard);
  };