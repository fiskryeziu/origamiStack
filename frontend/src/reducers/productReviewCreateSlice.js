import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {}

export const createReview = createAsyncThunk(
  'reviewCreate/createReview',
  async (productData, { getState, rejectWithValue }) => {
    try {
      const { productId, ratingData } = productData
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await API.post(
        `/products/${productId}/reviews`,
        ratingData,
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
const productReviewCreateSlice = createSlice({
  name: 'reviewCreate',
  initialState,
  reducers: {
    productCreateReviewReset(state, action) {
      return {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

// show user navbar and logout
export const { productCreateReviewReset } = productReviewCreateSlice.actions

export default productReviewCreateSlice.reducer
