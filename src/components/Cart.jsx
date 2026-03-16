function Cart({ cartItems, removeFromCart }) {
  return (
    <div>
      <h3>Your Cart</h3>
      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map((item, index) => (
        <div key={index}>
          <p>{item.name} - ₹{item.price}</p>
          <button onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
