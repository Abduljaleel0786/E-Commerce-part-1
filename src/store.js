import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from "./Slices/add-cart/addCartSlice"

export const store = configureStore({
    reducer: {

        counter : CounterReducer,

    },
})