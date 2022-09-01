import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const userUpdate = createAsyncThunk(
  'userupdate/userUpdate',
  async (user, { getState, rejectWithValue }) => {
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
      const { data } = await axios.put(`/users/${user._id}`, user, config)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    userUpdateReset(state, action) {
      return {
        user: {},
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userUpdate.pending, (state = { user: {} }) => {
        state.loading = true
      })
      .addCase(userUpdate.fulfilled, (state = { user: {} }, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(userUpdate.rejected, (state = { user: {} }, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export const { userUpdateReset } = userUpdateSlice.actions
export default userUpdateSlice.reducer
