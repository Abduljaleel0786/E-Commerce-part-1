import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isToast: false,
    isProductAdded:false,
  },
  reducers: {
    addproduct: (state, action) => {

      const isExist = state.items.find((item) => item.id === action.payload.id)

      if (isExist) {
        state.isToast = true;
      } else {
        state.isToast = false;
        state.isProductAdded = true;
        state.items.push({ ...action.payload, quantity: 1 });
       
    
      }

    },
    increaseQuantity: (state, action) => {

      const product = state.items.find((item) => item.id === action.payload.id)
      if (product) {
        product.quantity += 1;

      }
    },
    decreaseQuantity: (state, action) => {

      const product = state.items.find((item) => item.id === action.payload.id)
      if (product && product.quantity > 1) {
        product.quantity -= 1;

      } else {
        state.items = state.items.filter((item) => item.id !== action.payload.id)
      }
    },

    removeproduct: (state, action) => {

      state.items = state.items.filter((item) => item.id !== action.payload.id)


    }



  }
});

export const { addproduct, increaseQuantity, decreaseQuantity , removeproduct} = productSlice.actions;
export default productSlice.reducer;
