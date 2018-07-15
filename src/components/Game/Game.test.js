import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Game from './Game'

jest.mock('../../client/services')

describe('<Game />', () => {
  const renderedComponent = shallow(<Game />)

  it('renders correctly', () => {
    renderedComponent.update()
    expect(toJson(renderedComponent)).toMatchSnapshot()
  })

  it('When handleReset is clicked, flipped and matched cards are set to false', () => {
    const cards = renderedComponent.state().cards
    // Set a card to flipped
    cards[0].flipped = true
    renderedComponent.setState({ cards })
    // Call reset
    renderedComponent.find('#qa-reset').simulate('click')
    const resetCards = renderedComponent.state().cards.find(card => card.flipped || card.matched)
    expect(resetCards).toBeUndefined()
  })

  it('Component begins on level easy, then when toggle is clicked, it updates to hard', () => {
    expect(renderedComponent.state().level).toBe('easy')
    renderedComponent.find('#qa-toggle').simulate('click')
    expect(renderedComponent.state().level).toBe('hard')
  })
})
