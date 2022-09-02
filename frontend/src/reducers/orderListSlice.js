import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  orders: [],
}

export const listOrders = createAsyncThunk(
  'orderlist/listOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get('/orders', config)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message

      return rejectWithValue(message)
    }
  }
)

const orderListSlice = createSlice({
  name: 'orderlist',
  initialState,
  reducers: {
    orderListReset(state) {
      state.orders = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export const { orderListReset } = orderListSlice.actions
export default orderListSlice.reducer
