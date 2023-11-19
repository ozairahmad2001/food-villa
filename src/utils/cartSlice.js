import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
        state.items.push(action.payload);
    },//state is the initial state and action is the data that is coming
    removeItem: () => {
        state.items.pop();
    },
    clearCart: (state) => {
        state.items = [];
    }, 
  },
});
export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
