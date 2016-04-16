import { expect } from 'chai';
import { shallow } from 'enzyme';

import React from 'react';

import Hello from '../../app/components/Hello';

describe('<Hello />', () => {
  let component;

  before(() => {
    component = shallow(<Hello />);
  });

  it('renders with Hello text', () => {
    expect(component.text()).to.equal('Hello');
  });
});
