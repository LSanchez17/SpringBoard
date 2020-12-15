import React from 'react';
import {render} from '@testing-library/react';
import Todo from './Todo';

it('renders withouth a crash', () => {
    render(<Todo />)
})

it('passes the snapshot', () => {
    const {aFragment} = render(<Todo />);
    expect(aFragment).toMatchSnapshot();
})