import React from 'react'
import styles from './index.scss'
import Game from '../Game/Game'

const App = () => (
  <main className={styles.app} role='main'>
    <h1 className={styles.header}>✨ Memory ✨</h1>
    <p className={styles.body}>Select a card and find it's pair!</p>
    <Game />
  </main>
)

export default App
