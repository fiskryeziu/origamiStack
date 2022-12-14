import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
}

export const getOrderDetails = createAsyncThunk(
  'orderDetails/getOrderDetails',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await API.get(`/orders/${id}`, config)

      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    orderDetailsReset(state, action) {
      return {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

export const { orderDetailsReset } = orderDetailsSlice.actions
export default orderDetailsSlice.reducer
