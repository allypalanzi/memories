import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Game from './Game.js'

jest.mock('../../client/services')

describe('<Game />', () => {
  const renderedComponent = shallow(<Game />)

  it('renders correctly', () => {
    renderedComponent.update()
    expect(toJson(renderedComponent)).toMatchSnapshot()
  })
})
