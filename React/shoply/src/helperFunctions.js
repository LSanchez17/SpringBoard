export const calculateTotalQuantity = (iterableItems) => {
    //calculates total items in the state
    let total = 0;

    for(let id in iterableItems){
        total += iterableItems[id];
    }

    return total;
}

export const calculateCartTotal = (items, cart) => {
  let total = 0;

  for(let id in items){
    //grab the price from the current object
    let {price} = items[id];
    //do we have any of these in our cart?
    let quantity = cart[id] || 0;
    total += price * quantity;
  }

  return total.toFixed(2);
}