import React, { Component } from 'react'

import Timer from '../Timer/Timer'
import Card from '../Card/Card'
import Button from '../Button/Button'
import Winner from '../Winner/Winner'
import styles from './Game.scss'

import getCardsService from '../../client/services'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      level: 'easy',
      cards: [],
      matches: 0,
      maxMatches: 0,
      timer: false,
    }
  }

  async getCards(level) {
    try {
      const cards = await getCardsService(level)
      return this.setState({ cards, loading: false, maxMatches: cards.length / 2 })
    } catch (e) {
      this.setState({ loading: false })
      return e
    }
  }

  handleCardClick(value, id) {
    const cards = this.state.cards
    const selectedCard = cards[id]
    const otherFlippedCard = cards.find(card => card.flipped && !card.matched && card.id !== id)
    const maxMatches = this.state.maxMatches
    const matches = this.state.matches

    let newMatchesValue = matches

    // If the current card is not flipped, flip it
    if (!selectedCard.flipped) {
      selectedCard.flipped = true
    }

    // If there's another flipped card, and the values match, we have a match!
    if (otherFlippedCard && otherFlippedCard.value === selectedCard.value) {
      selectedCard.matched = true
      cards[otherFlippedCard.id].matched = true
      newMatchesValue += 1
      const timer = newMatchesValue !== maxMatches
      return this.setState({ cards, matches: newMatchesValue, timer })
    } else if (otherFlippedCard) {
      // Otherwise, wait a few seconds to flip the cards back over
      setTimeout(() => {
        cards.forEach(card => (card.flipped = false))
        return this.setState({ cards })
      }, 600)
    }

    return this.setState({ cards, timer: true })
  }

  handleReset() {
    const cards = this.state.cards
    cards.forEach(card => {
      card.flipped = false
      card.matched = false
    })
    this.setState({ cards, matches: 0, timer: false })
  }

  toggleLevel() {
    const level = this.state.level === 'easy' ? 'hard' : 'easy'
    this.handleReset()
    this.setState({ level })
    this.getCards(level)
  }

  componentDidMount() {
    this.getCards(this.state.level)
  }

  render() {
    const { cards, loading, maxMatches, matches, level, timer } = this.state
    if (loading) {
      return <div>loading</div>
    }

    if (cards.length) {
      const flippedCards = cards.filter(card => card.flipped && !card.matched) || false
      const cardDisplay = cards.map(card => (
        <Card
          onClick={() => this.handleCardClick(card.value, card.id)}
          flipped={card.flipped}
          key={`${card.id}_${card.value}`}
          id={card.id}
          value={card.value}
          matched={card.matched}
          disabled={flippedCards && flippedCards.length === 2}
        />
      ))

      return (
        <div className={styles.game}>
          {matches === maxMatches && <Winner />}
          <div
            className={matches === maxMatches ? `${styles.cards} ${styles.winner}` : styles.cards}
          >
            {cardDisplay}
          </div>
          <div className={styles.utilites}>
            <div>
              <Button id="qa-reset" onClick={() => this.handleReset()} text={'Reset'} />
              <Button
                id="qa-toggle"
                onClick={() => this.toggleLevel()}
                text={`Change level to ${level === 'easy' ? 'hard' : 'easy'}`}
              />
            </div>
            {timer && <Timer />}
          </div>
        </div>
      )
    }

    return <div>error</div>
  }
}

export default Game
