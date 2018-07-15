import React from 'react'
import styles from './Button.scss'

const Button = props => {
  const { onClick, text } = props
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
