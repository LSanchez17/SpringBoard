import './App.css';
import {Link} from 'react-router-dom';

function Navbar() {
  //Renders the list of links to traverse the pages
  return (
    <nav>
        <ul><Link to='/colors'>Colors</Link></ul>
        <ul><Link to='/colors/red'>Red</Link></ul>
        <ul><Link to='/colors/green'>Green</Link></ul>
        <ul><Link to='/colors/blue'>Blue</Link></ul>
        <ul><Link to='/colors/new'>New Color</Link></ul>
    </nav>
  );
}

export default Navbar;
