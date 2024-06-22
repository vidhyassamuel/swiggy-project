import { createStore, combineReducers } from "redux";
import {
  addItemToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../cartUtils";

const initialState = {
  cart: {
    items: [],
    itemCount: 0,
  },
};

const cartReducer = (state = initialState.cart, action) => {
  //   console.log(addItemToCart, "addItemToCart");
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: addItemToCart(state.items, action.payload),
        itemCount: state.itemCount + 1,
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: increaseItemQuantity(state.items, action.payload),
        itemCount: state.itemCount + 1,
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: decreaseItemQuantity(state.items, action.payload),
        itemCount: state.itemCount - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
