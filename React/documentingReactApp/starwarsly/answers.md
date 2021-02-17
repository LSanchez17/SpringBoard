- In action creators, like `getFilmFromAPI`, we use a "regular expression" ---
  what is that regular expression, and what is its purpose?
  * a regular expression that matches items in the corresponding dataset.  Looks specifically for digits that consists of 1 or more. (\d+) is the regular expression
  
- We're persisting the Redux store, so if you re-visit the app, it will remember
  the topics you've visited. Where is this stored? How is this done?
  * It is stored through using the following: 
    * persistConfig(key of root, storage, and stateReconcilers)
    * persistedReducer(takes the persisReducer(persisConfig, root) and applies the thunk middleware)
    * PersisGate as well
    * PersistedStore
  * Its done by sending state and reducers through these methods. These methods then use their logic to store it on the user's client.
  
- What does `combineReducers` do? Why are we using it? 
  * Combines different reducers into a single object, that then returns a single reducer to access these other reducers.  We use this to reduce having to write a reducer for each and every single new action we will do in multiple files.

- How does the "Reset to Fresh Exploration" feature work?
  * It clears our the entire store state, so that a user has "not" visited any planets, people, films.  

- Why are `FilmList.js`, `PlanetList.js`, and 
  `PersonList.js` all simple components that use an `ItemList`?
  Why is this a good design?
  * Modularity.  Each of them does a similar thing, but with different data objects needed.  Since these upper components handle the data wrangling, the ACTUAL display data gets passed into the ItemLis component, as a general data prop.  This helps keep thing modular and without having to write a separat PeopleItem, PlanetItem, etc. component.

- In the `HomePage` component we use the `useSelector` hook to save only a single fact---
  whether the first film is loaded, We could instead have selected all the
  films, and had the check for whether the first film is loaded in our
  `render` function. Why is this worse? What would the performance implications
  be?
  * That requires us to immediately make a call to the API even before the user starts adding to the store state.  This also stores unnecessary data, and it might interfere with how the application is structured.  This could accidentally populate people, planets, and renders the films state redundant.
  * Performance-wise, iterating through that many prepopulated objects can slow down the rendering.
  
- What good ideas for designing and organizing React apps have you learned from
  studying this code?
  * Modularization.  Think what a page would display, and then compartmentalize that into smaller chunks that are "independent" from each other.  This helps isolate bugs and prevents your app from breaking if we cant load a certain part of the data.
  
- Which Star Wars character would make the best React developer, and why?
  * Robot wise, R2-D2. People wise, yoda(think outside box, he shall).
