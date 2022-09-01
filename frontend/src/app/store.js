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
import orderMyListReducer from '../reducers/orderMyListSlice'
import userListReducer from '../reducers/userListSlice'
import userDeleteReducer from '../reducers/userDeleteSlice'
import userUpdateReducer from '../reducers/userUpdateSlice'

const store = configureStore({
  reducer: {
    productList: productReducer,
    productListDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
  },
})

export { store }
