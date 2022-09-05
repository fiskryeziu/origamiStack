import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {}

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { getState, rejectWithValue }) => {
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

      const { data } = await API.post('/orders', order, config)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderCreateReset(state, action) {
      return {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

export const { orderCreateReset } = orderSlice.actions

export default orderSlice.reducer
