import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../api'
import { orderMyListReset } from './orderMyListSlice'
import { userDetailsReset } from './userDetailsSlice'
import { userListReset } from './userListSlice'

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
      const { data } = await API.post('/users/login', userData, config)

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

export const registerActions = createAsyncThunk(
  'userLogin/registerActions',
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await API.post('/users', userData, config)
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      }

      return data
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
  dispatch(userDetailsReset())
  dispatch(orderMyListReset())
  dispatch(userListReset())
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
      .addCase(registerActions.pending, (state) => {
        state.loading = true
      })
      .addCase(registerActions.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(registerActions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(loginActions.pending, (state) => {
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
