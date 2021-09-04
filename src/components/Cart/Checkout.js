import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isNotEmpty = (input) => {
  return input.length > 0;
};

const isValidPostalCode = (input) => input.length === 6;

function Checkout(props) {
  const [formValidity, setFormValidity] = useState({
    isNameValid: true,
    isStreetValid: true,
    isCityValid: true,
    isPostalValid: true,
  });

  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputCityRef = useRef();
  const inputPostalRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let formIsValid = false;

    const isNameValid = isNotEmpty(inputNameRef.current.value);
    const isStreetValid = isNotEmpty(inputStreetRef.current.value);
    const isCityValid = isNotEmpty(inputCityRef.current.value);
    const isPostalValid = isValidPostalCode(inputPostalRef.current.value);

    setFormValidity({ isNameValid, isStreetValid, isCityValid, isPostalValid });
    if (isNameValid && isStreetValid && isCityValid && isPostalValid) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return false;
    }

    props.onCheckoutConfirm({
      name: inputNameRef.current.value,
      street: inputStreetRef.current.value,
      city: inputCityRef.current.value,
      postalCode: inputPostalRef.current.value,
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div
        className={`${classes.control} ${
          formValidity.isNameValid ? "" : classes.invalid
        }`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={inputNameRef} />
        {!formValidity.isNameValid && <p>Please Enter Non-Empty Name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.isStreetValid ? "" : classes.invalid
        }`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='name' ref={inputStreetRef} />
        {!formValidity.isStreetValid && (
          <p>Please Enter Non-Empty Street Name</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.isCityValid ? "" : classes.invalid
        }`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='name' ref={inputCityRef} />
        {!formValidity.isCityValid && <p>Please Enter Non-Empty City Name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.isPostalValid ? "" : classes.invalid
        }`}>
        <label htmlFor='postal-code'>Postal Code</label>
        <input type='text' id='name' ref={inputPostalRef} />
        {!formValidity.isPostalValid && (
          <p>Please Enter Valid 6 Digits Postal Code</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
