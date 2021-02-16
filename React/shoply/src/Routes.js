import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';

const Routes = () => {
    return (
      <Switch>
          <Route path='/' exact>
            {/* The "homepage" loads a list of all products */}
            <ProductList />
          </Route>
          <Route path='/products/:id' exact>
              {/* Uses the :id parameter to load data on "this" product */}
              <ProductDetail />
          </Route>
          <Route path='/cart' exact>
              {/* Loads the cart page */}
              <Cart />
          </Route>
          {/* Nothing matches? redirect to '/' */}
          <Redirect to='/' />
      </Switch>
    );
}

export default Routes;