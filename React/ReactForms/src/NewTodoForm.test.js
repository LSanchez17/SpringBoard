import React from 'react';
import {render} from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it('renders withouth a crash', () => {
    render(<NewTodoForm />)
})

it('passes the snapshot', () => {
    const {aFragment} = render(<NewTodoForm />);
    expect(aFragment).toMatchSnapshot();
})