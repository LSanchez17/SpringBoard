import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProductList = () => {
  //get all the items we have right now in the store
  const items = useSelector(currState => currState.products);
  const productDetails = Object.keys(items).map(id => (
    <div key={id}>
      <h2>
        <Link to={`/products/${id}`}>{items[id].name}</Link>
      </h2>
    </div>
  ));

  return (
    <div>
      <h2>View our inventory</h2>
      <div>
        {productDetails}
      </div>
    </div>
  );
}

export default ProductList