import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addCart} from './actions';

const ProductDetail = () => {
  //grab the parameter from this Current route
  const {id} = useParams();
  //we grab the current products in the store
  let {image_url, name, price, description} = useSelector(currState => ({
      ...currState.products[id]
  }));

  const dispatch = useDispatch();

  const sendDispatch = () => {
    console.log(id);
    dispatch(addCart(id));
  }

  return (
    <div>
      <div>
        <img src={image_url} alt={description}></img>
        <h3>{name}</h3>
        <p>{description}</p>
        <h2>${price}</h2>
        <button onClick={sendDispatch}>Add to cart</button>
      </div>
      <Link to='/'>Go back</Link>
    </div>
  );
}

export default ProductDetail;