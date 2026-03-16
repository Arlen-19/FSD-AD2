function Header({ cartCount }) {
  return (
    <div style={{ background: "black", color: "white", padding: "10px" }}>
      <h2>My Shop</h2>
      <p>Cart Items: {cartCount}</p>
    </div>
  );
}

export default Header;
