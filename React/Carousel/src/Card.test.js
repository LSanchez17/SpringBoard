import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it('renders card component', () => {
  render(<Card />);
})

it('Should pass snapshot', () => {
  const {aFragment} = render(<Card />);
  expect(aFragment).toMatchSnapshot();
})
