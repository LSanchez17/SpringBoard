import './App.css';
import Navbar from './Navbar';
import Colors from './Colors';
import Home from './Home';
import NewColorForm from './NewColorForm';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Router Links stored in the navbar, clickable, and takes 
            you to the "page" selected */}
        <Navbar />

        <Switch>
          <Route path='/colors/:color'>
            <Colors />
          </Route>
          <Route path='/colors/new'>
            <NewColorForm />
          </Route>
          <Route exact path='/colors'>
            <Home />
          </Route>
          <Redirect to='/colors' />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
