import React from 'react'
import styles from './index.scss'
import Game from '../Game/Game'

const App = () => (
  <main className={styles.app} role='main'>
    <h1 className={styles.header}>✨ Card Matcher ✨</h1>
    <Game />
  </main>
)

export default App
