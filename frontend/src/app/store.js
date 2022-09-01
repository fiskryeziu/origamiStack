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
import productDeleteReducer from '../reducers/productDeleteSlice'
import productReviewCreateReducer from '../reducers/productReviewCreateSlice'
import productTopRatedReducer from '../reducers/productTopRatedSlice'
import productCreateReducer from '../reducers/productCreateSlice'
import productUpdateReducer from '../reducers/productUpdateSlice'

const store = configureStore({
  reducer: {
    productList: productReducer,
    productListDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
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
