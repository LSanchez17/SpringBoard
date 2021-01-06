import './App.css';
import HomeNav from './HomeNav';
import Dog from './Dog';
import AllDogs from './AllDogs';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      {/* HomeNav displays the links we set up to different pages */}
      <HomeNav />
      {/* Route matches the links to "actual" pages that render
          the content we need, based on the parameter that is linked
          with the dogs/nameofdog, it matches the /dogs/ part, and allows
          the use of the "dogName" parameter.*/}
      <Switch>
        <Route path='/dogs/:dogName'>
          <Dog />
        </Route>
        <Route exact path='/dogs'>
          <AllDogs />
        </Route>
        <Redirect to='/dogs' />
      </Switch>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
