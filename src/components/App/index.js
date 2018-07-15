import React from 'react'
import Game from '../Game/Game'

import '../../client/styles/global.scss';

const App = () => (
  <main className='l-wrapper' role='main'>
    <h1>✨ Memory ✨</h1>
    <p>Select a card and find it's pair!</p>
    <Game />
  </main>
)

export default App
