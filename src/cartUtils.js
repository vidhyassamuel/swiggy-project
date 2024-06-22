export const addItemToCart = (cartItems, itemToAdd) => {
  console.log(cartItems, "<=cartItem");
  // console.log(itemToAdd, "<=itemToAdd");
  const existingItem = cartItems.find(
    (item) => item.card.info.id === itemToAdd.card.info.id
  );

  if (existingItem) {
    return cartItems.map((item) =>
      item.card.info.id === itemToAdd.card.info.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const increaseItemQuantity = (cartItems, itemToIncrease) => {
  return cartItems.map((item) =>
    item.card.info.id == itemToIncrease.card.info.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
};

export const decreaseItemQuantity = (cartItems, itemToDecrease) => {
  return cartItems.map((item) =>
    item.card.info.id == itemToDecrease.card.info.id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
