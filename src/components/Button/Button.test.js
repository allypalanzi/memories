import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Button from './Button.js';

describe('<Button/ >', () => {
  const onClick = jest.fn();
  const props = {
    onClick,
    text: 'I am a button, click me'
  }

  const renderedComponent = shallow(<Button {...props} />);

  it('renders correctly', () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it('calls the function on click', () => {
    renderedComponent.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
