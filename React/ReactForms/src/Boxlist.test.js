import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Boxlist from './Boxlist';

it('renders withouth a crash', () => {
    render(<Boxlist />)
})

it('passes the snapshot', () => {
    const {aFragment} = render(<Boxlist />);
    expect(aFragment).toMatchSnapshot();
})

it('handles box logic', () => {
    const {getByText, getByLabelText, queryByText, getByTestId} = render(<Boxlist />);
    //labelText matches only if the text we search is in the <label>TEXT</label>
    //We also need to add an id matching the htmlFor/for name in the label
    //<label htmlFor='test'>Test</label> <input ... id='test' />
    //then getByLabelText('Test') to acquire the input!
    const colorInput = getByLabelText('Box Color');
    const heightInput = getByLabelText('Box Height');
    const widthInput = getByLabelText('Box Width');
    const submitButton = getByText('Submit');

    //No box with rendered remove test should be here
    const missingBox = queryByText('Box Begone');
    expect(missingBox).not.toBeInTheDocument();

    //create a new box
    fireEvent.change(colorInput, { target: { value: 'Red' }});
    fireEvent.change(heightInput, { target: { value: 50 }});
    fireEvent.change(widthInput, { target: { value: 50 }});

    //submit new box
    fireEvent.click(submitButton);

    //check for box to render, check color matching submitted value
    const renderedBox = getByTestId('Red');
    expect(renderedBox).toBeInTheDocument();

    //now remove the box
    const removeButton = getByText('Box Begone');
    fireEvent.click(removeButton);

    expect(renderedBox).not.toBeInTheDocument();
})