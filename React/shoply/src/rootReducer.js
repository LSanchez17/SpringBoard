import {ADD_TO_CART, REMOVE_FROM_CART} from './actionType';
import {calculateCartTotal} from './helperFunctions';
import data from './data.json';

const INIT_STATE = {
    products: data.products,
    cartItems: {},
    cartValue: 0,
}

const rootReducer = (state = INIT_STATE, action) => {
  switch(action.type){
    case ADD_TO_CART: {
      let copy = {...state.cartItems};
      //how we add more than one cart item
      copy[action.id] = (copy[action.id] || 0) + 1;
      
      return {
        ...state,
        cartItems: copy,
        cartValue: calculateCartTotal(state.products, copy)
      };
    }   
    case REMOVE_FROM_CART: {
      let copy = {...state.cartItems};
      if(!copy[action.id]){
        return state;
      }
      
      copy[action.id]--;

      if(copy[action.id] === 0){
        delete copy[action.id];
      }

      return {
        ...state, 
        cartItems: copy,
        cartValue: calculateCartTotal(state.products, copy)
      };
    } 
    default: {
      return state;
    }
  }
}

export default rootReducer;