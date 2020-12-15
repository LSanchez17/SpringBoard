import React from 'react';
import {render} from '@testing-library/react';
import Box from './Box';

it('renders withouth a crash', () => {
    render(<Box />)
})

it('passes the snapshot', () => {
    const {aFragment} = render(<Box />);
    expect(aFragment).toMatchSnapshot();
})