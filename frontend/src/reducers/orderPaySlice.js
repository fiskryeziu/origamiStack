import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const payOrder = createAsyncThunk(
  'orderpay/payOrder',
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()

      const { orderId, paymentResult } = orderData

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `orders/${orderId}/pay`,
        paymentResult,
        config
      )
      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)
const orderPaySlice = createSlice({
  name: 'orderpay',
  initialState,
  reducers: {
    orderPayReset(state, action) {
      return {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(payOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

// show user navbar and logout
export const { orderPayReset } = orderPaySlice.actions

export default orderPaySlice.reducer
