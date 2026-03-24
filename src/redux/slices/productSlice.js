import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: "Laptop", price: 50000, category: "electronics", image: "💻", description: "High-performance laptop" },
    { id: 2, name: "Mobile", price: 20000, category: "electronics", image: "📱", description: "Latest smartphone" },
    { id: 3, name: "Headphones", price: 3000, category: "electronics", image: "🎧", description: "Wireless headphones" },
    { id: 4, name: "Tablet", price: 15000, category: "electronics", image: "📲", description: "10-inch tablet" },
    { id: 5, name: "Smartwatch", price: 8000, category: "electronics", image: "⌚", description: "Fitness tracking watch" },
    { id: 6, name: "Camera", price: 45000, category: "electronics", image: "📷", description: "4K digital camera" }
  ],
  filter: ''
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => { state.filter = action.payload; },
    clearFilter: (state) => { state.filter = ''; }
  }
});

export const { setFilter, clearFilter } = productSlice.actions;
export default productSlice.reducer;
