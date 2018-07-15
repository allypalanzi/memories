import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Winner from './Winner'

describe('<Winner />', () => {
  const renderedComponent = shallow(<Winner />)

  it('renders correctly', () => {
    expect(toJson(renderedComponent)).toMatchSnapshot()
  })
})
