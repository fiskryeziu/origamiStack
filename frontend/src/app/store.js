import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productSlice'
import productDetailsReducer from '../reducers/productDetailsSlice'
import cartReducer from '../reducers/cartSlice'
import userLoginReducer from '../reducers/userSlice'
import userDetailsReducer from '../reducers/userDetailsSlice'

const store = configureStore({
  reducer: {
    productList: productReducer,
    productListDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
  },
})

export { store }
