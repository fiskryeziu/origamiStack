import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {}

export const deleteUser = createAsyncThunk(
  'userDelete/deleteUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await API.delete(`/users/${id}`, config)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)

const userDeleteSlice = createSlice({
  name: 'userdelete',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export default userDeleteSlice.reducer
