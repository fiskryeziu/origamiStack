import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productSlice'
import productDetailsReducer from '../reducers/productDetailsSlice'
import cartReducer from '../reducers/cartSlice'
import userLoginReducer from '../reducers/userSlice'
import userDetailsReducer from '../reducers/userDetailsSlice'
import userUpdateProfileReducer from '../reducers/userUpdateProfileSlice'

const store = configureStore({
  reducer: {
    productList: productReducer,
    productListDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
  },
})

export { store }
