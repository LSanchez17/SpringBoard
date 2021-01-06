import './App.css';
import {Link} from 'react-router-dom';

function HomeNav() {
  return (
      <nav>
        <ul><Link to='/dogs'>Dogs</Link></ul>
        <ul><Link to='/dogs/whiskey'>Whiskey</Link></ul>
        <ul><Link to='/dogs/duke'>Duke</Link></ul>
        <ul><Link to='/dogs/tubby'>Tubby</Link></ul>
        <ul><Link to='/dogs/perry'>Perry</Link></ul>
      </nav>
  );
}

export default HomeNav;
