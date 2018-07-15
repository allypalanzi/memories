/**
* getCardsService to pull card data
* @param {string} level - level for which card data to pull from the api
**/

export async function getCardsService(level) {
  try {
    const response = await fetch('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json');
    const cards = await response.json();
    const leveledCards = cards.levels.find(card => card.difficulty === level);
    // Return the cards formatted in the way the component expects.
    const stateCards = leveledCards.cards.map((card, index) => {
      return { value: card, matched: false, flipped: false, id: index }
    });
    return stateCards;
  } catch (e) {
    console.error('oh no! an error!', e);
  }
}
