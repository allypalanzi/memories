import React, { Component } from 'react'

import Timer from '../Timer/Timer'
import Card from '../Card/Card'
import Button from '../Button/Button'
import styles from './Game.scss'

import { getCardsService } from '../../client/services';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      level: 'easy',
      cards: [],
      flipped: 0,
      matches: 0,
      maxMatches: 0,
      timer: false,
      error: false,
    }
  }

  async getCards(level) {
    try {
      const cards = await getCardsService(level);
      this.setState({ cards, loading: false, maxMatches: cards.length / 2} );
    } catch (e) {
      this.setState({ error: true, loading: false });
      console.error('oh no! an error!', e);
    }
  };

  handleClick(value, id) {
    const cards = this.state.cards;
    const selectedCard = cards[id];
    const otherFlippedCard = cards.find(card => card.flipped && !card.matched && card.id != id);
    const maxMatches = this.state.maxMatches;
    const matches = this.state.matches;
    const flipped = this.state.flipped;

    let newFlippedValue = flipped;
    let newMatchesValue = matches;

    // First, check if there are already two cards flipped over
    // And that the selected card is not already flipped (if so, we'll toggle it later)
    // If so, reset their flipped values.
    if (flipped === 2 && !selectedCard.flipped) {
      cards.forEach(card => card.flipped = false);
      newFlippedValue = 0;
    }

    // If the selectedCard is already flipped, we need to reflip it, and reduce our flip count.
    if (selectedCard.flipped) {
      newFlippedValue--;
      selectedCard.flipped = false;
      // If it is not flipped, we flip it, and increase our flip count.
    } else if (!selectedCard.flipped) {
      newFlippedValue++;
      selectedCard.flipped = true;
    }

    if (flipped !== 2 && otherFlippedCard && otherFlippedCard.value === selectedCard.value) {
      selectedCard.matched = true;
      cards[otherFlippedCard.id].matched = true;
      newMatchesValue++;
      newFlippedValue = 0;
    }

    const timer = newMatchesValue === maxMatches ? false : true;
    this.setState({ cards, flipped: Math.max(0, newFlippedValue), matches: newMatchesValue, timer });
  }

  handleReset() {
    const cards = this.state.cards;
    cards.forEach(card => {
      card.flipped = false;
      card.matched = false;
    });
    this.setState({ cards, flipped: 0, matches: 0, timer: false });
  }

  toggleLevel() {
    const level = this.state.level === 'easy' ? 'hard' : 'easy';
    this.handleReset();
    this.setState({ level });
    this.getCards(level);
  }

  componentDidMount() {
    this.getCards(this.state.level);
  }

  render() {
    const { cards, loading, flipped, maxMatches, matches, level, timer, error } = this.state;
    if (loading) {
      return (<div>loading</div>)
    }

    if (error) {
      return (<div>error</div>)
    }

    const cardDisplay = cards.map((card, index) => <Card onClick={e => this.handleClick(card.value, card.id)} flipped={card.flipped} key={index} id={card.id} value={card.value} matched={card.matched} />);

    return (
      <div>
        {matches === maxMatches && <h1>u win</h1>}
        <div className={styles.cards}>
          {cardDisplay}
        </div>
        <div className={styles.utilites}>
          <div>
            <Button onClick={e => this.handleReset()} text={'Reset'} />
            <Button onClick={e => this.toggleLevel()} text={`Change level to ${level === 'easy' ? 'hard' : 'easy'}`} />
          </div>
          {timer && <Timer />}
        </div>
      </div>
    )
  };
};

export default Game
