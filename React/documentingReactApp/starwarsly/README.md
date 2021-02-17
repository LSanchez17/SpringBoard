# Overview:
    * We start with an empty state(films, planets, people)
    * We begin with a new hope loaded into the state
    * If the returned data from the api call to a new hope is not in our state(films, planets, people), it is “unknown”
    * If we have it, it is not “unknown”
    * As we click on “unknown”, it gets added to our state, and * we get new links from that api call
    * We can reset our application state, and repeat.
    * Planets, films, and people are only “discovered” when clicked upon

# Components:
## Index:
    * Provider with a store made in ‘store.js’
    * PersistConfig: key:’root’, storage, stateReconciler: autoMergeLevel2
    * PersistedReducer: persistReducer(persistConfig, root)
    * store : createStore with PersistedReducer, and using ComposeWithDevTools(ApplyMiddleware(thunk)
    * Make a store, with a reducer, and thunk library
    * Use of persistedReducer to not have to rely on new Redux storage each time.  Persists what we’ve seen
    * PersistGate with no loading prop and a persistedStore prop

## App:
    * Contains BrowserRouter
    * Navbar and routes are inside of it

## Navbar:
    * Navlinks to the following: 
        * ‘/’ ⇒  Homepage
        * ‘/films’ ⇒ Films
        * ‘/planets’ ⇒ Planets
        * ‘/people’ ⇒ People

## Routes: 
    * Switch with routes:
        * ‘/’ ⇒ <Homepage />
        * ‘/films’ ⇒ <FilmList />
        * ‘/films/:id’ ⇒ <Film />
        * ‘/planets’ ⇒ <PlanetList />
        * ‘/planets/:id’ ⇒ <Planet />
        * ‘/people’ ⇒ <PersonList />
        * ‘/people/:id’ ⇒ <person />

    ### No way to redirect for unknowable routes, so going to a route that is not matched or resembled, leads to no page

## HomePage:
    * Sets a dispatch variable, a way to reset all data, and a “loaded” variable.  The loaded state is films, which show which films a user has “unlocked” or undefined.
    * If any films? Load a reset button to reset all data
    * Link to seeing a film/1; the 1 is hardcoded, not really a great way to handle that.

## ItemList:
    * Takes two props, items, and title.  Returns an ItemList, which only renders if there are more than 0 items in the items prop.  If we do have more than 0 items in the items prop, we iterate through them all, displaying Links to the item url, item name, and item id.

## SubList:
    * Sublist renders a component that contains the props title, and items passed down.  This shows a title, and under that title, we iterate through the items, displaying them in a list, each as a Link, that has the id of the item, the url for that item, and the display(unknown or actual name) of the item

## FilmList:
    * Uses a useSelector hook to grab all of the values from the store film object, and then does a map through them, populating a list of urls that is then passed down to the ItemList component

## Film:
    * Has a handful of variables:
        * id(comes from url of which is given by filmList, which is rendered through ItemList, as a component from the items inside the items prop made in FilmList ⇒ ItemList.
        * Films coming from the store films object
        * planetState coming from the store planets object
        * characterState coming from the store people object
        * Dispatch, obvious
        * Missing a boolean derived from the film variable existing or not
        * We use a useEffect hook to check if the Missing boolean is true.  If it is, we make a dispatch to get the film reducer data with the id from the URL. This hook is dependent on the missing, id, and dispatch variable(they change when we go to a new film).  Obviously if its missing, we tell the user its loading…
        * We get a planets variable, that is derived from the film object, iterating through that film’s planets. We make each planet an object, with an id, url with the id, and a display that only appears if this planet, from this film, is in our store
        * We get a characters variable, derived from the film object, iterating through that film’s characters.  It only appears if the characters are in our current store state already, else unknown
        * We display a component that has a film name, the films openingCrawl, the film’s director, and a Sublist component, consisting of the planets and characters passed as props

## PlanetList:
    * Gets the planets from the store’s state, and we iterate through each planet, to make a planet object with a url encompassing that planet’s id.
    * Returns an ItemList component, with the prop of the result of the returned above data.

## Planet:
    * We get the variables Id(from the url of this planet), a planet data object(from the store’s planets matching the id), the filmState(coming from the store’s films), a characterState(coming from the store’s people state data), a dispatch shorthand, and a missing boolean
    * Keeps a useEffect hook that sends a dispatch to get the API data with the url Id parameter.
    * If missing, display loading
    * Films & residents object.
    * Iterates through the planet’s list of films & residents.
    * Each sub-item is returned as an object with an id pertaining to each instance, a url with an id, and a display boolean
    * Renders a planet, with a planet name, a climate, a population, and a SubList component, one with residents props, and one with films as a prop.

## PersonList:
    * Gets the person data from the store state.  Then iterate through that, to make a person object(with a url with that person’s id).  Returns an ItemList with the items consisting of people passed down as props.

## Person:
    * We get the variables Id(from the url of this person), a person data object(from the store’s people state data matching the id), the planetState(coming from the store’s planets), a filmState(coming from the store’s films state data), a dispatch shorthand, and a missing boolean
    * Keeps a useEffect hook that sends a dispatch to get the API data with the url Id parameter.
    * If missing, display loading
    * We get a hw variable, storing the person’s homeworld value
    * We then create a homeworld object(id of hw, url of that hw, display unknown/known)

## Films object
    * Iterates through the person’s list of films
    * Each sub-item is returned as an object with an id pertaining to each instance, a url with an id, and a display boolean
    * Renders a person, with a person name, a person id, a person gender, a person’s birth year, a homeworld url, and a homeworld display.
    * Renders a SubList component with a films prop

# Redux items:
## ‘Reset.js’
    * Returns a { type: RESET_ALL }
    * Presumably clears the entire store of any data

## ‘Type.js’ actions:
    * Contains LOAD_FILM, LOAD_PLANET, LOAD_PERSON, RESET_ALL
    * Exported as types of actions for the reducer/dispatch

## Root.js Reducer:
    * Combines three other reducers as one. So this can be called as combineReducers.films, combineReducers.planets, combineReducers.people.  This then calls the exported reducer from each of these
    * Films, Planets, People reducers:
    * Films start as {};
    * Gets the initial state, and an action
    * If action is RESET_ALL, clear it
    * If action is LOAD_FILM, return the state, and the action.payload.id: {...action.payload}
    * People start as {};
    * Gets Init state, action
    * If action is RESET_ALL, clear it
    * LOAD_PERSON, return {...state, [action.payload.id]: {...action.payload}}
    * Planet {};
    * Init State, Action
    * RESET_ALL, {...INIT_STATE}
    * LOAD_PLANET, {...state, [action.payload.id]: {...action.payload}}

## Thunk-esque items:
    * Films(id):
    * Gets data from API with a given ID.  Turns the data into a film object, then dispatches the data, to the main reducer, which takes a LOAD_FILM action & payload of film
    * Planets(id):
    * Gets data from API with a given ID. Turns the data into a planet object, and dispatches the action and payload.
    * People(id):
    * Gets data from API with ID. Turns data into person object, dispatches action & payload.

