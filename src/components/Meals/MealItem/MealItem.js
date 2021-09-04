import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
  const ctxt = useContext(CartContext);
  const price = `₹${props.price.toFixed(2)}`;

  const addCartItemHandler = (amount) => {
    ctxt.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal}>
      {/* <div> */}
      <h3>{props.name}</h3>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.price}>{price}</div>
      {/* </div> */}

      <MealItemForm onAddCartItem={addCartItemHandler} />
      {/* </div> */}
    </li>
  );
}

export default MealItem;
