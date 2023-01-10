import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import { authAPI } from '../features/auth/auth-api'

type InitialStateType = typeof initialState

const initialState = {
  isAppInitialized: false as boolean,
  error: null as null | string,
  isLoading: false as boolean,
}

export const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppInitialized(state, action: PayloadAction<{ isAppInitialized: boolean }>) {
      state.isAppInitialized = action.payload.isAppInitialized
    },
    setAppError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
    setAppStatus(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading
    },
  },
})

export const appReducer = slice.reducer
export const { setAppInitialized, setAppError, setAppStatus } = slice.actions

export const isAppInitializeTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.me()

    if (response) {
      dispatch(setAppInitialized({ isAppInitialized: true }))
    }
  } catch (error) {
    dispatch(setAppError({ error: 'ERROR INITIALIZE' }))
  }
}

{
  /*export const appReducer = (
              state: InitialStateType = initialState,
              action: ActionsType
            ): InitialStateType => {
              switch (action.type) {
                case 'app/SET-APP-INITIALIZED':
                  return { ...state, isAppInitialized: action.value }
                case 'app/SET-ERROR':
                  return { ...state, error: action.error }
                case 'app/SET-IS-LOADING':
                  return { ...state, isLoading: action.isLoading }
                default:
                  return state
              }
            }
            export const setAppInitializedAC = (value: boolean) =>
              ({ type: 'app/SET-APP-INITIALIZED', value } as const)
            export const setAppErrorAC = (error: string | null) => ({ type: 'app/SET-ERROR', error } as const)
            export const setAppStatusAC = (isLoading: boolean) =>
              ({ type: 'app/SET-IS-LOADING', isLoading } as const)
              export type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>
            export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
            export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
    
            type ActionsType = SetAppInitializedAT | SetAppErrorAT | SetAppStatusAT
    
    
    
                */
}
