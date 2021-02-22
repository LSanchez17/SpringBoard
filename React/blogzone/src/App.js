import './App.css';
import NewPost from './components/NewPost';
import Post from './components/Post';
import Home from './components/Home';
import {Route, NavLink, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <h2>MicroBlog</h2>
        <p>A collection of blogs, now with React Router, and Redux!</p>
        <nav>
          <NavLink exact to='/'>Blogs</NavLink>
          <NavLink exact to='/new'>Make a new post</NavLink>
        </nav>
        
        <Switch>
          <Route exact path='/new'>
            <NewPost />
          </Route>
          
          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path ='/:postId'>
            <Post />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
