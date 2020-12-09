import './App.css';
import Deck from './Deck';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Click to draw some new cards!</p>
        <Deck />
      </header>
    </div>
  );
}

export default App;
