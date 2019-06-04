import React from 'react';
import { shallow } from 'enzyme';
import GotoBox from './GotoBox';

it('renders without crashing', () => {
    shallow(<GotoBox />);
});
