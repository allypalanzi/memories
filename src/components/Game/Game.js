import React, { Component } from 'react'

import Timer from '../Timer/Timer'
import Card from '../Card/Card'
import Button from '../Button/Button'
import styles from './Game.scss'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      level: 'easy',
      cards: [],
      flipped: 0,
      lastCard: {},
      matches: 0,
      maxMatches: 0,
    }
  }
  async getCards() {
    try {
      const response = await fetch('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json');
      const cards = await response.json();
      const leveledCards = cards.levels.find(card => card.difficulty === this.state.level);
      const cardsState = leveledCards.cards.map((card, index) => {
        return { value: card, matched: false, flipped: false, id: index }
      });
      this.setState({cards: cardsState, loading: false, maxMatches: cardsState.length / 2})
    } catch (e) {
      console.error(e)
    }
  };


  handleClick(value, id) {
    const cards = this.state.cards;
    const selectedCard = cards[id];
    const lastCard = this.state.lastCard;
    let matches = this.state.matches;
    let flipped = this.state.flipped;
    if (lastCard.id !== selectedCard.id && lastCard.value === selectedCard.value) {
      selectedCard.matched = true;
      cards[lastCard.id].matched = true;
      matches++
      flipped = 0;
    }
    if (flipped === 2) {
      cards.forEach(card => card.flipped = false);
      flipped = 0;
    }
    selectedCard.flipped = !selectedCard.flipped;
    const flippedValue = selectedCard.flipped ? flipped + 1 : flipped - 1;
    this.setState({ cards, flipped: flippedValue, lastCard: selectedCard, matches: matches });
  }

  handleReset() {
    const cards = this.state.cards;
    cards.forEach(card => {
      card.flipped = false;
      card.matched = false;
    });
    this.setState({ cards, flipped: 0, maches: 0, lastCard: {} });
  }

  toggleLevel() {
    const level = this.state.level === 'easy' ? 'hard' : 'easy';
    this.setState({ level });
    this.getCards();
  }

  componentWillMount() {
    this.getCards();
  }

  render() {
    const { cards, loading, flipped, maxMatches, matches, level } = this.state;
    if (loading) {
      return (<div>loading</div>)
    }
    const cardDisplay = cards.map((card, index) => <Card onClick={e => this.handleClick(card.value, card.id)} flipped={card.flipped} key={index} id={card.id} value={card.value} matched={card.matched} />);
    return (
      <div className={styles.wrapper}>
        {matches === maxMatches && <h1>u win</h1>}
        <div className={styles.cards}>
          {cardDisplay}
        </div>
        <Button onClick={e => this.handleReset()} text={'Reset'} />
        <Button onClick={e => this.toggleLevel()} text={`Change level to ${level === 'easy' ? 'hard' : 'easy'}`} />
        <Timer />
      </div>
    )
  };
};

export default Game
