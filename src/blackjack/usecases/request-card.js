 // Allow take a card from the deck
 export const requestCard = (deck) => {
  if (deck.length === 0) {
    throw "Deck is empty";
  }
  return deck.pop();
};