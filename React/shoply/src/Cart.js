import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import RemoveItemComponent from './RemoveItemComponent';

const Cart = () => {
    //sets these items in the "store" 
    const {cartItems, cartValue, products} = useSelector(currState => currState);

    const renderItems = () => {
      let itemsRows = Object.keys(cartItems).map(id => (
        <tr key={id}>
          <td><Link to={`/products/${id}`}>{products[id].name}</Link></td>
          <td>${products[id].price}</td>
          <td>{cartItems[id]}</td>
          <td><RemoveItemComponent id={id} /></td>
        </tr>
      ));
    
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>    
          <tbody>{itemsRows}</tbody>
        </table>
      );
    };

    // Is our cart empty? or full of goodies?
    return cartItems.length === 0 ? (
      <h2>Cart is empt!</h2>
    ) : (
      <div>
        {/* Render the product table */}
        {renderItems()}

        <p>
          Total: ${cartValue}
        </p>
      </div>
    );
}

export default Cart;