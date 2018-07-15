import React from 'react'
import styles from './Winner.scss'

const Winner = () => (
  <h3 className={styles.winner}>
    <span role="img" aria-label="tada emoji">
      🎉
    </span>{' '}
    You win!{' '}
    <span role="img" aria-label="tada emoji">
      🎉
    </span>
  </h3>
)

export default Winner
