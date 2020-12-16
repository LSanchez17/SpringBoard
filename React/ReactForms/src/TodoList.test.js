import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import TodoList from './TodoList';

it('renders withouth a crash', () => {
    render(<TodoList />)
})

it('passes the snapshot', () => {
    const {aFragment} = render(<TodoList />);
    expect(aFragment).toMatchSnapshot();
})

it('handles todo logic', () => {
    const {getByText, getByLabelText, queryByText, getByTestId} = render(<TodoList />);
    //labelText matches only if the text we search is in the <label>TEXT</label>
    //We also need to add an id matching the htmlFor/for name in the label
    //<label htmlFor='test'>Test</label> <input ... id='test' />
    //then getByLabelText('Test') to acquire the input!
    const todoDescription = getByLabelText('Add a todo:');
    const submitButton = getByText('Submit');

    //No box with rendered remove test should be here
    const missingTodo = queryByText('I finished!');
    expect(missingTodo).not.toBeInTheDocument();

    //create a new box
    fireEvent.change(todoDescription, { target: { value: 'Test react' }});
   
    //submit new box
    fireEvent.click(submitButton);

    //check for box to render, check color matching submitted value
    const renderedTodo = getByText('My task is Test react!');
    expect(renderedTodo).toBeInTheDocument();

    //now remove the box
    const removeButton = getByText('I finished!');
    fireEvent.click(removeButton);

    expect(renderedTodo).not.toBeInTheDocument();
})