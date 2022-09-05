import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {
  loading: false,
  products: [],
  error: '',
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (obj) => {
    const { pageNumber = '', rangeValue = '' } = obj

    const { data } = await API.get(
      `/products?pageNumber=${pageNumber}&rangeValue=${rangeValue}`
    )
    return data
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.pages = action.payload.pages
        state.page = action.payload.page
        state.error = ''
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default productSlice.reducer
