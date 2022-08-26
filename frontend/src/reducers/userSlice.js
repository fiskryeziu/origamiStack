import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
}

export const loginActions = createAsyncThunk(
  'userLogin/loginActions',
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post('users/login', userData)

      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      }
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message

      return thunkAPI.rejectWithValue(message)
    }
  }
)

const userSlice = createSlice({
  name: 'userLogin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginActions.pending, (state, action) => {
        state.loading = true
      })
      .addCase(loginActions.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.error = ''
      })
      .addCase(loginActions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
