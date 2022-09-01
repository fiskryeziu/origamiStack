import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
}

export const listTopProducts = createAsyncThunk(
  'topRatedProduct/listTopProductcs',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/products/top')

      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)
const productTopRatedSlice = createSlice({
  name: 'topRatedProduct',
  initialState,
  reducers: {
    productCreateReviewReset(state, action) {
      return {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listTopProducts.pending, (state) => {
        state.loading = true
        state.products = []
      })
      .addCase(listTopProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(listTopProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

export default productTopRatedSlice.reducer
