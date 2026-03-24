import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);

function Cart() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(state => state.cart);
  const navigate = useNavigate();

  const discount = useMemo(() => {
    if (totalQuantity >= 5) return 0.10;
    if (totalQuantity >= 3) return 0.05;
    return 0;
  }, [totalQuantity]);

  const discountAmount = Math.round(totalPrice * discount);
  const finalPrice = totalPrice - discountAmount;

  const handleRemoveFromCart = useCallback((productId, productName) => {
    dispatch(removeFromCart(productId));
    toast.info(`${productName} removed from cart`, { autoClose: 1500 });
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    if (items.length > 0) {
      dispatch(clearCart());
      toast.success("Cart cleared!", { autoClose: 1500 });
    }
  }, [dispatch, items.length]);

  const handleCheckout = useCallback(() => {
    if (items.length === 0) {
      toast.error("Your cart is empty!", { autoClose: 1500 });
      return;
    }
    toast.success(
      `Order placed! Total: ${formatPrice(finalPrice)}`,
      { autoClose: 2000 }
    );
    navigate("/end");
    dispatch(clearCart());
  }, [items.length, finalPrice, dispatch]);

  return (
    <div className="cartContainer">
      <div className="cartHeader">
        <span className="cartIcon">🛒</span>
        Cart Items
      </div>

      {items.length === 0 ? (
        <div className="emptyCart">
          <div className="emptyCartIcon">📭</div>
          <p className="emptyCartText">
            Your cart is empty. Start shopping!
          </p>
        </div>
      ) : (
        <>
          <div className="itemsList cartScroll">
            {items.map((item) => (
              <div key={item.id} className="cartItem">
                <div className="itemInfo">
                  <div className="itemName">{item.name}</div>
                  <div className="itemPrice">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>

                <div className="quantityControl">
                  <button
                    className="quantityBtn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="quantityValue">
                    {item.quantity}
                  </span>
                  <button
                    className="quantityBtn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  className="removeBtn"
                  onClick={() => handleRemoveFromCart(item.id, item.name)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {discount > 0 && (
            <div className="discountSection">
              <p className="discountText">
                 {Math.round(discount * 100)}% Discount Applied!
              </p>
            </div>
          )}

          <div className="cartSummary">
            <div className="summaryRow">
              <span className="summaryLabel">Subtotal:</span>
              <span className="summaryValue">{formatPrice(totalPrice)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="summaryRow">
                <span className="summaryLabel">Discount:</span>
                <span className="summaryValue" style={{ color: '#27ae60' }}>
                  −{formatPrice(discountAmount)}
                </span>
              </div>
            )}
            <div className="summaryRow">
              <span className="summaryLabel">Shipping:</span>
              <span className="summaryValue">FREE</span>
            </div>
            <div className="totalRow">
              <span className="totalLabel">Total:</span>
              <span className="totalValue">{formatPrice(finalPrice)}</span>
            </div>
          </div>

          <div className="actionButtons">
            <button
              className="checkoutBtn"
              onClick={handleCheckout}
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
            <button
              className="clearBtn"
              onClick={handleClearCart}
              aria-label="Clear cart"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
