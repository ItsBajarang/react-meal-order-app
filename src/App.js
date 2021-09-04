import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";


function App() {
  const [isCartOpen, SetIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    SetIsCartOpen(true);
  }

  const HandleCartClose = () => {
    SetIsCartOpen(false);
  }

  return (
    <CartProvider>
      {isCartOpen && <Cart onClose={HandleCartClose} />}
      <Header onOpen={handleCartOpen} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
