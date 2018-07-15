import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.scss'

const Button = props => {
  const { onClick, text } = props
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}

export default Button
