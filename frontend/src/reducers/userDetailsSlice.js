import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {},
  loading: false,
  error: null,
}

export const getUserDetails = createAsyncThunk(
  'userDetails/getUserDetails',
  async (id, { getState }) => {
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/users/${id}`, config)
    return data
  }
)

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    userDetailsReset(state, action) {
      state.user = {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export const { userDetailsReset } = userDetailsSlice.actions
export default userDetailsSlice.reducer
