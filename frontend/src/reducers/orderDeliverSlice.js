import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {}

export const deliverOrder = createAsyncThunk(
  'orderDeliver/deliverOrder',
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
      const { data } = await API.put(`/orders/${order._id}/deliver`, {}, config)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)
const deliverOrderSlice = createSlice({
  name: 'orderdeliver',
  initialState,
  reducers: {
    orderDeliverReset(state, action) {
      return {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deliverOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

// show user navbar and logout
export const { orderDeliverReset } = deliverOrderSlice.actions

export default deliverOrderSlice.reducer
