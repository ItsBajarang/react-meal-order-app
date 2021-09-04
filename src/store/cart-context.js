import React from "react";

const CartContext = React.createContext({
  items: [
    { id: 1, name: "demo item", description: "demo description", price: 23 },
  ],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () => {},
});

export default CartContext;
