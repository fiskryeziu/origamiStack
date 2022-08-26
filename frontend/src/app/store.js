import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productSlice'
import productDetailsReducer from '../reducers/productDetailsSlice'
import cartReducer from '../reducers/cartSlice'

const store = configureStore({
  reducer: {
    productList: productReducer,
    productListDetails: productDetailsReducer,
    cart: cartReducer,
  },
})

export { store }
