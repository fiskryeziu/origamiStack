import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {}

export const createProduct = createAsyncThunk(
  'productCreate/createProduct',
  async (_, { getState, rejectWithValue }) => {
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
      const { data } = await API.post('/products', {}, config)

      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message

      return rejectWithValue(message)
    }
  }
)

const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState,
  reducers: {
    productCreateReset(action, payload) {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.product = action.payload
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { productCreateReset } = productCreateSlice.actions
export default productCreateSlice.reducer
