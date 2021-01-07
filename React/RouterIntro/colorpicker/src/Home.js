import './App.css';
import { useState } from 'react';

function Home() {
  //Renders a "home page"
  //In this case, the home page lists all of the current colors
  const [colors, setColors] = useState(['red', 'blue', 'green']);

  return (
    <div className="App">
      <h3>Welcome!</h3>
      <p>Click on a link to be taken to a new page full of color!</p>
      <h4>{colors.map(color => <p>{color}</p>)}</h4>
    </div>
  );
}

export default Home;
