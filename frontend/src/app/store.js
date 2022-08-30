import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productSlice'
import productDetailsReducer from '../reducers/productDetailsSlice'
import cartReducer from '../reducers/cartSlice'
import userLoginReducer from '../reducers/userSlice'
import userDetailsReducer from '../reducers/userDetailsSlice'
import userUpdateProfileReducer from '../reducers/userUpdateProfileSlice'
import orderCreateReducer from '../reducers/orderSlice'
import orderDetailsReducer from '../reducers/orderDetailsSlice'
import orderPayReducer from '../reducers/orderPaySlice'

const store = configureStore({
  reducer: {
    productList: productReducer,
    productListDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
  },
})

export { store }
