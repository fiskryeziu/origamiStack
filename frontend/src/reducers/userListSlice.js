import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const initialState = {
  users: [],
}
export const listUsers = createAsyncThunk(
  'userlist/listUsers',
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
      const { data } = await API.get('/users', config)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message

      return rejectWithValue(message)
    }
  }
)

const userListSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    userListReset(state) {
      state.users = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export const { userListReset } = userListSlice.actions
export default userListSlice.reducer
