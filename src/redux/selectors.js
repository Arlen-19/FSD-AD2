export const selectAllProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const selectCurrentFilter = (state) => state.products.filter;
export const selectProductLoading = (state) => state.products.loading;
export const selectProductError = (state) => state.products.error;

export const selectProductById = (state, productId) => {
  return state.products.products.find(product => product.id === productId);
};

export const selectProductsByCategory = (state, category) => {
  return state.products.products.filter(product => product.category === category);
};

export const selectSearchResults = (state) => {
  const { products, filter } = state.products;
  if (!filter.trim()) return products;
  
  return products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.category.toLowerCase().includes(filter.toLowerCase())
  );
};

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalPrice;
export const selectCartQuantity = (state) => state.cart.totalQuantity;
export const selectCartShowState = (state) => state.cart.showCart;

export const selectCartItemById = (state, productId) => {
  return state.cart.items.find(item => item.id === productId);
};

export const selectCartSummary = (state) => {
  const { items, totalPrice, totalQuantity } = state.cart;

  let discount = 0;
  let discountAmount = 0;
  
  if (totalQuantity >= 5) {
    discount = 0.10;
  } else if (totalQuantity >= 3) {
    discount = 0.05;
  }
  
  discountAmount = Math.round(totalPrice * discount);
  const finalPrice = totalPrice - discountAmount;
  
  return {
    itemCount: items.length,
    totalQuantity,
    subtotal: totalPrice,
    discount: discount * 100,
    discountAmount,
    finalPrice,
    isEmpty: items.length === 0
  };
};

export const selectIsCartEmpty = (state) => state.cart.items.length === 0;

export const selectAvailableDiscountTiers = (state) => {
  const { totalQuantity } = state.cart;
  
  return [
    {
      quantity: 3,
      discount: 5,
      isActive: totalQuantity >= 3,
      message: 'Get 5% off with 3+ items'
    },
    {
      quantity: 5,
      discount: 10,
      isActive: totalQuantity >= 5,
      message: 'Get 10% off with 5+ items'
    }
  ];
};

export const selectAppState = (state) => ({
  products: {
    all: selectAllProducts(state),
    filtered: selectFilteredProducts(state),
    filter: selectCurrentFilter(state),
    loading: selectProductLoading(state),
    error: selectProductError(state)
  },
  cart: {
    items: selectCartItems(state),
    summary: selectCartSummary(state),
    isEmpty: selectIsCartEmpty(state)
  }
});

export const selectExpensiveItemsInCart = (state) => {
  return state.cart.items.filter(item => item.price > 10000);
};

export const selectCheapItemsInCart = (state) => {
  return state.cart.items.filter(item => item.price < 5000);
};
