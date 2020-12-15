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

it('submits box data', () => {
    const {queryByText, getByLabelText} = render(<Boxlist />);
    const colorInput = getByLabelText('Box Color');
    const heightInput = getByLabelText('Box Height');
    const widthInput = getByLabelText('Box Width');
    const submitButton = getByQueryText('Submit')
})