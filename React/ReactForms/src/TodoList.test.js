import React from 'react';
import {render} from '@testing-library/react';
import TodoList from './TodoList';

it('renders withouth a crash', () => {
    render(<TodoList />)
})

it('passes the snapshot', () => {
    const {aFragment} = render(<TodoList />);
    expect(aFragment).toMatchSnapshot();
})