// Who win
export const determinedWinner = (playersPoints) => {

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