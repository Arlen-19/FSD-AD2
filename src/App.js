import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EndScreen from "./components/EndScreen";

function App() {
  const cartState = useSelector(state => state.cart);
  const [, setLocalStorage] = useState(() => {
    const item = window.localStorage.getItem("cart");
    return item ? JSON.parse(item) : [];
  });

  useEffect(() => {
    setLocalStorage(() => {
      window.localStorage.setItem("cart", JSON.stringify(cartState.items));
      return cartState.items;
    });
  }, [cartState.items]);

  const location = window.location.pathname;

  return (
    <BrowserRouter>
    {location !== "/end" && (
      <div className="app">
        <div className="appContainer">
          <Header />
          <div className="mainContent">
            <div className="productsSection">
              <ProductList />
            </div>
            <div className="cartSection">
              <Cart />
            </div>
          </div>
        </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>)}
    <Routes>
      <Route path="/end" element={<EndScreen />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
