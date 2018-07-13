import React from 'react'

import styles from './Card.scss'

const Card = (props) => {
  const { value, onClick, flipped, matched } = props;
  return (
    <button disabled={matched} onClick={onClick} className={matched ? `${styles.card} ${styles.matched}` : styles.card}>
      {flipped || matched ? value : '✨'}
    </button>
  );
}

export default Card;
