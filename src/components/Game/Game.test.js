import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Game from './Game'
import Card from '../Card/Card'

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

  it('a card flips when it is selected', () => {
    renderedComponent.find(Card).first().simulate('click')
    expect(renderedComponent.find(Card).first().props().flipped).toBe(true)
  })

  it('when two cards are selected and they match, they have matched props', () => {
    renderedComponent.find('#qa-reset').simulate('click')
    const cards = renderedComponent.find({ value: '☆' });
    cards.first().simulate('click');
    cards.last().simulate('click');
    const updatedCards = renderedComponent.find({ value: '☆' });
    expect(updatedCards.first().props().matched).toBe(true)
    expect(updatedCards.last().props().matched).toBe(true)
  })

  it('when two cards are selected and they do not match, they are not matched', () => {
    renderedComponent.find('#qa-reset').simulate('click')
    const card1 = renderedComponent.find({ value: '☆' }).first();
    const card2 = renderedComponent.find({ value: '♫' }).first();
    card1.simulate('click');
    card2.simulate('click');
    const updatedCard1 = renderedComponent.find({ value: '☆' }).first();
    const updatedCard2 = renderedComponent.find({ value: '♫' }).first();

    expect(updatedCard1.props().matched).toBe(false)
    expect(updatedCard2.props().matched).toBe(false)
  })
})
