import React, { useContext, useState, useEffect } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [hasItems, setHasItems] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);

  const ctxt = useContext(CartContext);
  const totalAmount = `₹${ctxt.totalAmount.toFixed(2)}`;

  const addCartItemHandler = (item) => {
    ctxt.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      amount: 1,
    });
  };

  const removeCartItemHandler = (id) => {
    ctxt.removeItem(id);
  };

  useEffect(() => {
    ctxt.items.length ? setHasItems(true) : setHasItems(false);
  }, [ctxt.items]);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctxt.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const handleOrderClick = () => {
    console.log("Order Placed");
    setIsCheckout(true);
  };

  const handleOrderPlaced = async (user) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-e0675-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: user,
          oderedItems: ctxt.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmitted(true);
    ctxt.clearItems();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrderClick}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalActions = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount </span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onClose}
          onCheckoutConfirm={handleOrderPlaced}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmitted && cartModalActions}
      {isSubmitting && (
        <p className={classes.messages}>Submitting the Order. Please Wait...</p>
      )}
      {didSubmitted && (
        <>
          <p className={classes.messages}>
            Thank you, Your Order has been Placed.
          </p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default Cart;
