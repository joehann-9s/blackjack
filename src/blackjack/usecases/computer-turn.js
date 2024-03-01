// Computer turn

import { acumulatePoints } from "./acumulate-points";
import { createCard } from "./create-card";
import { determinedWinner } from "./determine-winner";
import { requestCard } from "./request-card";


export const computerTurn = (minScore, deck, playersPoints,htmlScore,divPlayerCards) => {
    let computerScore = 0;

    do {

      const card = requestCard(deck);

      computerScore = acumulatePoints(card, playersPoints.length - 1, playersPoints,htmlScore);

      createCard( card, playersPoints.length - 1,divPlayerCards);



   
    } while ((computerScore < minScore) && (minScore <= 21));

    determinedWinner(playersPoints); 
  };