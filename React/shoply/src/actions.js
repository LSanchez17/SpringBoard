import {ADD_TO_CART, REMOVE_FROM_CART} from './actionType';

export const addCart = (id) => {
  return {
    type: ADD_TO_CART,
    id
  };
}

export const removeCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id
  };
}

