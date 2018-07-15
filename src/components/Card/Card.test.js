import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from './Card.js';

describe('<Card />', () => {
  const onClick = jest.fn();
  const props = {
    onClick,
    flipped: false,
    matched: false,
    value: '👋'
  };
  const renderedComponent = shallow(<Card {...props} />);

  it('renders correctly', () => {
    expect(toJson(renderedComponent)).toMatchSnapshot();
  });
});
