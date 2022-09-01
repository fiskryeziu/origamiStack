import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const deleteProduct = createAsyncThunk(
  'productDelete/deleteProduct',
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
      const response = await axios.delete(`/products/${id}`, config)
      return response.data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message

      return rejectWithValue(message)
    }
  }
)

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default productDeleteSlice.reducer
