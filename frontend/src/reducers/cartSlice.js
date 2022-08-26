import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const cartItemFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : {};

const initialState = {
  cartItems: cartItemFromStorage,
  //   shippingAddress: shippingAddressFromStorage,
}

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${id}`)

  dispatch(
    cartAddItem({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  )
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(
    cartRemoveItem({
      payload: id,
    })
  )

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// export const saveShippingAdress = (data) => (dispatch) => {
//   dispatch(cartSaveShippingAddress(data));

//   localStorage.setItem("shippingAddress", JSON.stringify(data));
// };
// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch(cartSavePaymentMethod(data));

//   localStorage.setItem("paymentMethod", JSON.stringify(data));
// };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAddItem(state, action) {
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    },
    cartRemoveItem(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.payload
        ),
      }
    },
    // cartSaveShippingAddress(state, action) {
    //   return {
    //     ...state,
    //     shippingAddress: action.payload,
    //   };
    // },
    // cartSavePaymentMethod(state, action) {
    //   console.log(action);
    //   return {
    //     ...state,
    //     paymentMethod: action.payload,
    //   };
    // },
  },
})

export const {
  cartAddItem,
  cartRemoveItem,
  //   cartSaveShippingAddress,
  //   cartSavePaymentMethod,
} = cartSlice.actions

export default cartSlice.reducer
