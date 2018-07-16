import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Card from './Card'

describe('<Card />', () => {
  const onClick = jest.fn()
  const props = {
    onClick,
    flipped: false,
    matched: false,
    value: '👋',
  }
  const renderedComponent = shallow(<Card {...props} />)

  it('renders correctly', () => {
    expect(toJson(renderedComponent)).toMatchSnapshot()
  })

  it('calls onClick when card is clicked', () => {
    renderedComponent.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  // TODO: tests for styles based on props
})
