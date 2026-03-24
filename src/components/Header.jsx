import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, clearFilter } from "../redux/slices/productSlice";
import "../styles/Header.css";

function Header() {
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.cart.totalQuantity);
  const filter = useSelector(state => state.products.filter);
  const [debouncedValue, setDebouncedValue] = useState(filter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(filter);
    }, 300);
    return () => clearTimeout(handler);
  }, [filter]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value.trim()) {
      dispatch(setFilter(value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <header className="header">
      <div className="headerContent">
        <div>
          <h1 className="logo">ShopHub</h1>
          <p className="tagline">Your favorite online store</p>
        </div>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search products..."
            className="searchInput"
            value={filter}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="cartBadge">
        {cartCount}
      </div>
    </header>
  );
}

export default Header;
