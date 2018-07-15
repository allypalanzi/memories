import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './'

jest.mock('../../client/services')

describe('<App/ >', () => {
  const renderedComponent = shallow(<App />)

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  it('renders correctly', () => {
    expect(toJson(renderedComponent)).toMatchSnapshot()
  })
})
