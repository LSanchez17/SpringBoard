### Conceptual Exercise

Answer the following questions below:

- What is Redux? Why might you use it?
  * Redux is a state management library.  It is used for highly complex & enterprise level applications.
  * It helps manage state across the entire application, without the prop drilling issues, or without using React Context

- What are three features of the Redux developer tool in Chrome?
  * Allows you to inspect the React component structure
  * It shows you which components and subcomponents are rendered on the page
  * You can select a component and inspect their current props & state

- What is a store?
  * A store is where we keep the entire state of the application, for easy access throughout the application

- What is a reducer?
  * A reducer takes in a state, and an "action". It then modifies the state within the store, depending on the "action" that is given.

- What is an action?
  * An action is a string defined by the developers, that when passed to a reducer, dictates what will happen to the state.
  (ADD_TO_STATE, REMOVE_TO_STATE, etc)

- What is an action creator?
  * An action creator is a function, that when called returns an "action type", and any associated payload attached to it.

- How does data flow in a React/Redux application?
  * Data flows in this order, continously:
    * React component accesses/modifies sends for an action
    * Action takes in data(if given), and then calls the reducer
    * The reducer coordinates with the store to modify the state
    * The store then "returns" the data for the component


- What is the purpose of the `<Provider>` component?
  * Allows access to any component that gets rendered within the <Provider> </Provider> wrappers. Usually wrapped aroud the <App /> component, so each subsequent component inside has acess to the store

- What is the purpose of the `useSelector` hook? What does it return?
  * `useSelector` takes in the current state as a parameter, and returns the data you want from it. It accesses the store state, and you can get a certain property from it.
  * Say you want to access the store's state, and get the `currentUsername` property, you'd do...
  ``` const currUserName = useSelector(currState => currState.currUserName); ```

- Describe the `useDispatch` hook. What do you use it for?
  * `useDispatch` is commonly store as a variable called `const dispatch`.  Once stored, you can then call it with any actions(ADD, DELETE, etc) so that you can call the `Reducer` and modify the state as needed.

- What is redux-thunk and why would you use it?
  * A middleware that allows you to get `functions` out of action creators, which can the be used to make asynchronous calls, that can then be used within and for the store.

- What are propTypes?
  * Helps make sure the component being given a prop, is an accurate `type of` prop.

- Describe the `useCallback` hook.  What is it used for?
  * Works through `momoization`.  Memoizes a version of the callback that you defined, and will only change, if a dependency that you gave it changes.

- Compare and contrast the `useReducer` hook with Redux (including react-redux).  Why would you choose one over the other?
 * While `useReducer` **can** work as a redux impersonator, you have to pair it with `useContext` in order to really have access throughout the application.
 * You would use redux, when your application becomes very large, with a lot of data, and components that modify the data.  Even so, if your application will only reach a certain level of complexity, you might be able to get away without relying on the redux library.