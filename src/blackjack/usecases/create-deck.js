import _ from 'underscore';

export const createDeck = (typeOfCard, typeSpecials) => {

    let deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of typeOfCard) {
        deck.push(i + type);
      }
    }

    for (let type of typeOfCard) {
      for (let spe of typeSpecials) {
        deck.push(spe + type);
      }
    }
    return _.shuffle(deck);
  };