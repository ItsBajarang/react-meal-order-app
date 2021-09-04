import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const inputAmountRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsAmountValid(true);
    const inputAmount = inputAmountRef.current.value;
    const inputAmountNumber = +inputAmount;

    if (inputAmount.length === 0 || inputAmountNumber < 1 || inputAmount > 5) {
      setIsAmountValid(false);
      return;
    }

    props.onAddCartItem(inputAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label='Amount'
        input={{
          id: "amount",
          type: "number",
          //min: "1",
          //max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!isAmountValid && (
        <p className={classes["wrong-amount"]}>
          Please enter valid amount between 1-5
        </p>
      )}
    </form>
  );
}
export default MealItemForm;
