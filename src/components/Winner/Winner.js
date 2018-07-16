import React from 'react'
import styles from './Winner.scss'

const Winner = () => (
  <h2 className={styles.winner}>
    <span role="img" aria-label="tada emoji">
      🎉
    </span>
    You win!
    <span role="img" aria-label="tada emoji">
      🎉
    </span>
  </h2>
)

export default Winner
