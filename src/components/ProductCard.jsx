import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "../styles/ProductCard.css";

const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, { position: "bottom-right", autoClose: 2000 });
  }, [dispatch, product]);

  const handleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
    toast.info(isWishlisted ? "Removed from wishlist" : "Added to wishlist", { autoClose: 1500 });
  }, [isWishlisted]);

  return (
    <div className="card">
      <div className="imageContainer">
        <div className="image">{product.image}</div>
      </div>
      <div className="content">
        <h3 className="name">{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="priceContainer">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="badge">In Stock</span>
        </div>
      </div>
      <div className="buttonContainer">
        <button 
          className="addButton"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
        <button
          className={`wishlistButton ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={`Add ${product.name} to wishlist`}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
