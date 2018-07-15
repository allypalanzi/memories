import React from 'react'
import PropTypes from 'prop-types'

import styles from './Card.scss'

const Card = props => {
  const { value, onClick, flipped, matched, disabled } = props
  const classList = [styles.card]
  if (flipped || matched) {
    classList.push(styles.flipped)
  }
  if (matched) {
    classList.push(styles.matched)
  }

  return (
    <button disabled={matched || disabled} onClick={onClick} className={classList.join(' ')}>
      <div className={styles.icon_container}>
        <div className={flipped || matched ? `${styles.icon} ${styles.visible}` : styles.icon}>
          {value}
        </div>
        <div className={flipped || matched ? `${styles.icon}` : `${styles.icon} ${styles.visible}`}>
          <span role="img" aria-label="sparkle emoji">
            ✨
          </span>
        </div>
      </div>
    </button>
  )
}

Card.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  flipped: PropTypes.bool,
  matched: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Card
