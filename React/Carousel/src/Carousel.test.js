import React from "react";
import { render, fireEvent, queryAllByAltText } from "@testing-library/react";
import Carousel from "./Carousel";

it('renders carousel component', function() {
  render(<Carousel />);
})

it('Should pass snapshot', () => {
  const {aFragment} = render(<Carousel />);
  expect(aFragment).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it('works when you click on the left arrow', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  //when on the second image, pressing the left arrow takes you back
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument(); //current page
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument(); //previous page

  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the first image to show up when going back, not the second!
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
});

it('Makes the left arrow dissapear', () => {
  const {queryByTestId} = render(<Carousel />);

  const rightArrow = queryByTestId('right-arrow');
  const leftArrow = queryByTestId('no-left-arrow');

  expect(rightArrow).toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
})

it('Makes the right arrow dissapear', () => {
  const {queryByTestId} = render(<Carousel />);

  const rightArrow = queryByTestId('right-arrow');

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  const leftArrow = queryByTestId('left-arrow');
  const noRightArrow = queryByTestId('no-right-arrow');

  expect(leftArrow).toBeInTheDocument();
  // expect(rightArrow).not.toBeInTheDocument(); Can't check for it for some reason
  // might have to do with a render issue
  expect(noRightArrow).toBeInTheDocument();
})

