import { valueCard } from "./value-card";

// Turn: 0 = 1st player y the last is the computer
export const acumulatePoints = (card, turn, playersPoints, htmlScore) => {
  playersPoints[turn] = playersPoints[turn] + valueCard(card);
  htmlScore[turn].innerText = playersPoints[turn];
  return playersPoints[turn];
};
