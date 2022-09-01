import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const updateProduct = createAsyncThunk(
  'productUpdate/updateProduct',
  async (product, { getState, rejectWithValue }) => {
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
      const { data } = await axios.put(
        `/products/${product._id}`,
        product,
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

const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState,
  reducers: {
    productUpdateReset(state, action) {
      return {
        product: {},
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateProduct.pending, (state = { product: {} }) => {
        state.loading = true
      })
      .addCase(updateProduct.fulfilled, (state = { product: {} }, action) => {
        state.loading = false
        state.success = true
        state.product = action.payload
      })
      .addCase(updateProduct.rejected, (state = { product: {} }, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export const { productUpdateReset } = productUpdateSlice.actions
export default productUpdateSlice.reducer
