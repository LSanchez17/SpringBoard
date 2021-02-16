import React from 'react';
import {useDispatch} from 'react-redux';
import {removeCart} from './actions';

const RemoveItemComponent = ({id}) => {
  const dispatch = useDispatch();
  const remove = () => {
      dispatch(removeCart(id));
  }

  return (
    <div>
      <button onClick={remove}>Remove me!</button>    
    </div>
  )
}

export default RemoveItemComponent;