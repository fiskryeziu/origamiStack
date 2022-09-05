import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userInfo: userInfoFromStorage,
}

export const updateUserProfile = createAsyncThunk(
  'userUpdate/updateUserPrfile',
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
      const { data } = await API.put('/users/profile', user, config)

      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message
      return rejectWithValue(message)
    }
  }
)
const userUpdateProfileSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    userUpdateProfileReset(state, action) {
      return {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.userInfo = action.payload
        localStorage.setItem('userInfo', JSON.stringify(action.payload))
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

// show user navbar and logout
export const { userUpdateProfileReset } = userUpdateProfileSlice.actions
export default userUpdateProfileSlice.reducer
