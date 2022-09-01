import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  orders: [],
}

export const listMyOrder = createAsyncThunk(
  'ordermylist/listMyOrder',
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
      const { data } = await axios.get('/orders/myorders', config)

      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)

const orderMyListSlice = createSlice({
  name: 'ordermylist',
  initialState,
  reducers: {
    orderMyListReset(state, action) {
      state.orders = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listMyOrder.pending, (state, action) => {
        state.loading = true
      })
      .addCase(listMyOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(listMyOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export const { orderMyListReset } = orderMyListSlice.actions
export default orderMyListSlice.reducer
