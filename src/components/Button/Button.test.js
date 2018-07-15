import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Button from './Button.js';

describe('<Button/ >', () => {
  const props = {
    onClick: jest.fn(),
    text: 'I am a button, click me'
  }

  const renderedComponent = shallow(<Button {...props} />);

  it('renders correctly', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
