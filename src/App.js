import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 }
  ];

  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems([...cartItems, product]);
  }

  function removeFromCart(index) {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  }

  return (
    <div>
      <Header cartCount={cartItems.length} />
      <ProductList products={products} addToCart={addToCart} />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;
