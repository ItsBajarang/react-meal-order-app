import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaulCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id;
      });

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE":
      const itemToRemoveIndex = state.items.findIndex((item) => {
        return item.id === action.id;
      });
      let itemToRemove = state.items[itemToRemoveIndex];

      let updatedItemsList;
      let newTotalAmount;
      if (itemToRemove) {
        if (itemToRemove.amount > 1) {
          updatedItemsList = state.items.map((item) => {
            if (item.id === itemToRemove.id) {
              item.amount = item.amount - 1;
            }
            return item;
          });
        } else {
          updatedItemsList = state.items.filter((item) => {
            return item.id !== action.id;
          });
        }
        newTotalAmount = +(state.totalAmount - itemToRemove.price);
      }
      return { items: updatedItemsList, totalAmount: newTotalAmount };

    case "CLEAR":
      return defaulCartState;

    default:
      return defaulCartState;
  }
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaulCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearItemsFromCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items, //[{ name: 'demp food', price: 50, amount: 5 }],
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItems: clearItemsFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
