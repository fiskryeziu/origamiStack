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
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post('users/login', userData, config)

      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      }
      return await data
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message

      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const logout = () => (dispatch, getState) => {
  localStorage.removeItem('userInfo')
  dispatch(userLogout())
}
const userSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    userLogout(state) {
      state.userInfo = null
    },
  },
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
        state.error = action.payload.message
      })
  },
})

const { userLogout } = userSlice.actions
export default userSlice.reducer
