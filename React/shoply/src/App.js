import './App.css';
import NavBar from './NavBar.js';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      {/* NavBar always at the "top" of the application*/}
      <NavBar />
      <div>
        <h1>Shoply!</h1>
        {/* Routes here, will "render" the correct page */}
        <Routes />
      </div>
    </div>
  );
}

export default App;
