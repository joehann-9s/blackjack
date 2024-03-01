export const valueCard = (card) => {
    const valueCard = card.substring(0, card.length - 1);
    return (isNaN(valueCard)) ?
            (valueCard === "A") ? 11 : 10
            : valueCard * 1;
  };