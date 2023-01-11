import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  extraReducers: builder => {
    builder.addCase(isAppInitialize.fulfilled, (state, action) => {
      state.isAppInitialized = true
    })
    {
      /* builder.addCase(isAppInitialize.rejected, (state, error) => {
                        setAppError({error: 'ERROR INITIALIZE'})
                        state.isAppInitialized = false
                      })*/
    }
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    })
  },
})
const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected')
}

export const appReducer = slice.reducer
export const { setAppInitialized, setAppError, setAppStatus } = slice.actions

export const isAppInitialize = createAsyncThunk(
  'me/isAppInitialize',
  async function (_, { dispatch, rejectWithValue }) {
    dispatch(setAppStatus({ isLoading: true }))
    try {
      const response = await authAPI.me()

      if (response) {
        return (
          dispatch(setAppInitialized({ isAppInitialized: true })),
          dispatch(setAppStatus({ isLoading: false }))
        )
      }
    } catch (error) {
      dispatch(setAppError({ error: 'ERROR INITIALIZE' }))

      return rejectWithValue(error)
    }
  }
)
{
  /*
    
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
    
    
                    export const appReducer = (
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
