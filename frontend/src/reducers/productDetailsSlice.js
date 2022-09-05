import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {
  loading: false,
  product: { reviews: [] },
  error: '',
}

export const fetchProductsDetails = createAsyncThunk(
  'product/fetchProductsDetails',
  async (id) => {
    const response = await API.get(`/products/${id}`)

    return response.data
  }
)

const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productDetailsReset(state, action) {
      return {
        product: {},
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsDetails.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchProductsDetails.fulfilled, (state, action) => {
      state.loading = false
      state.product = action.payload
      state.error = ''
    })
    builder.addCase(fetchProductsDetails.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const { productDetailsReset } = productDetailsSlice.actions
export default productDetailsSlice.reducer
