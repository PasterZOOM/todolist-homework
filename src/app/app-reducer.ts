import {authAPI} from 'api/todolists-api'
import {setIsLoggedInAC} from 'features/Login/auth-reducer'
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(error, dispatch)
  }
})

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, (state) => {
      state.isInitialized = true
    })
  }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
