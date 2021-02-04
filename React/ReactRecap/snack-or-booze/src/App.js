import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Food from "./FoodItem";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // const [snacks, setSnacks] = useState([]);
  // const [drinks, setDrinks] = useState([]);

  const [food, setFood] = useState();

  useEffect(() => {
    async function getFoodItems() {
      let foodItems = await SnackOrBoozeApi.getFoodItems();

      setFood(foodItems);
      setIsLoading(false);
    }
    getFoodItems();
  }, []);

  // useEffect(() => {
  //   async function getSnacks() {
  //     let snacks = await SnackOrBoozeApi.getSnacks();
  //     setSnacks(snacks);
  //     setIsLoading(false);
  //   }
  //   getSnacks();
  // }, [])

  // useEffect(() => {
  //   async function getDrinks() {
  //     let drinks = await SnackOrBoozeApi.getDrinks();
  //     setDrinks(drinks);
  //     setIsLoading(false);
  //   }
  //   getDrinks();
  // }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home foods={food} />
            </Route>
            {/* Menu for Snacks below */}
            <Route exact path="/snacks">
              <Menu foods={food[0]} type={'snacks'} title="Snacks" />
            </Route>


            <Route path="/snacks/:id">
              <Food items={food[0]} cantFind="/snacks" />
            </Route>

            {/* Menu for Drinks below */}
            <Route exact path="/drinks">
              <Menu foods={food[1]} type={'drinks'} title="Drinks" />
            </Route>

            <Route path="/drinks/:id">
              <Food items={food[1]} cantFind="/drinks" />
            </Route>

            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
