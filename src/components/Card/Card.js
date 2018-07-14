import React from 'react'

import styles from './Card.scss'

const Card = (props) => {
  const { value, onClick, flipped, matched } = props;
  const classList = [styles.card];
  if (flipped || matched) {classList.push(styles.flipped)};
  if (matched) { classList.push(styles.matched)};

  return (
    <button disabled={matched} onClick={onClick} className={classList.join(' ')}>
    <div className={styles.icon_container}>
      <div className={flipped || matched ? `${styles.icon} ${styles.visible}` : styles.icon }>
        {value}
        </div>
      <div className={flipped || matched ? `${styles.icon}` : `${styles.icon} ${styles.visible}` }>
        ✨
      </div>
    </div>
    </button>
  );
}

export default Card;
