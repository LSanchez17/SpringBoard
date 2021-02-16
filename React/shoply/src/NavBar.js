import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import {calculateTotalQuantity} from './helperFunctions';

const NavBar = () => {
    let totalItems = useSelector(currState => calculateTotalQuantity(currState.cartItems));
    let cartValue = useSelector(currState => currState.cartValue);

    return(
        <nav>
          <Link to='/' >Shoply!</Link>

          <ul>
            <li><span>{totalItems}-${cartValue}</span></li>
            <li>
              <Link to='/cart' >View Cart</Link>
            </li>
          </ul>
        </nav>
    )
}

export default NavBar;