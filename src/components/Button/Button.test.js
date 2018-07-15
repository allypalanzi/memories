import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from './Button.js';

describe('<Button/ >', () => {
  const onClick = jest.fn();
  const props = {
    onClick,
    text: 'I am a button, click me'
  }

  const renderedComponent = shallow(<Button {...props} />);

  it('renders correctly', () => {
    expect(toJson(renderedComponent)).toMatchSnapshot();
  });

  it('calls the function on click', () => {
    renderedComponent.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
