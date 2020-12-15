import React from 'react';
import {render} from '@testing-library/react';
import NewBoxForm from './NewBoxForm';
import NewTodoForm from './NewTodoForm';

it('renders withouth a crash', () => {
    render(<NewBoxForm />)
})

it('passes the snapshot', () => {
    const {aFragment} = render(<NewBoxForm />);
    expect(aFragment).toMatchSnapshot();
})
