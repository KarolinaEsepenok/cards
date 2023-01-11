import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../../app/app-reducer'
import { authAPI, LoginDataType } from '../auth-api'

type InitialStateType = typeof initialState
const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
}

const slice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setSignIn(state, action: PayloadAction<InitialStateType>) {
      ;(state.email = action.payload.email),
        (state.password = action.payload.password),
        (state.rememberMe = action.payload.rememberMe)
    },
  },
})

export const signInReducer = slice.reducer
export const { setSignIn } = slice.actions
export const signInThunk = createAsyncThunk<
  // IntialStateType,
  ReturnType<typeof setSignIn> | undefined, //TODO:fix
  LoginDataType,
  { rejectValue: string }
>('signIn/signInThunk', async function (values: LoginDataType, { rejectWithValue, dispatch }) {
  setAppStatus({ isLoading: true })
  try {
    dispatch(setAppStatus({ isLoading: true }))
    const response = await authAPI.signIn(values)

    if (response) {
      return setSignIn({
        email: response.data.email,
        password: response.data.password,
        rememberMe: response.data.rememberMe,
      })
    }
    dispatch(setAppStatus({ isLoading: false }))
  } catch (error) {
    // dispatch(setAppError({ error: 'not valid email/password /ᐠ-ꞈ-ᐟ\\' }))

    return rejectWithValue('not valid email/password /ᐠ-ꞈ-ᐟ\\')
    //setAppError({ error: 'not valid email/password /ᐠ-ꞈ-ᐟ\\' })
  }
})
// {
//   /*
//                                 export const signInTC = (values: LoginDataType) => async (dispatch: Dispatch) => {
//                                   dispatch(setAppStatus({ isLoading: true }))
//                                   try {
//                                     const response = await authAPI.signIn(values)
//
//                                     if (response) {
//                                       dispatch(
//                                         setSignIn({
//                                           email: response.data.email,
//                                           password: response.data.password,
//                                           rememberMe: response.data.rememberMe,
//                                         })
//                                       )
//                                       dispatch(setAppStatus({ isLoading: false }))
//                                     }
//                                   } catch (error) {
//                                     dispatch(setAppError({ error: 'not valid email/password /ᐠ-ꞈ-ᐟ\\' }))
//                                   }
//                                 }
//
//                                 {
//                                   /*export const signInTC = (values: LoginDataType) => {
//                                                                                                           return (dispatch: Dispatch) => {
//                                                                                                             dispatch(setAppStatusAC(true))
//                                                                                                             authAPI
//                                                                                                               .signIn(values)
//                                                                                                               .then(response => {
//                                                                                                                 if (response) {
//                                                                                                                   dispatch(
//                                                                                                                     setSignIn({
//                                                                                                                       email: response.data.email,
//                                                                                                                       password: response.data.password,
//                                                                                                                       rememberMe: response.data.rememberMe,
//                                                                                                                     })
//                                                                                                                   )
//                                                                                                                   dispatch(setAppStatusAC(false))
//                                                                                                                 }
//                                                                                                               })
//                                                                                                               .catch(error => {
//                                                                                                                 dispatch(setAppErrorAC('not valid email/password /ᐠ-ꞈ-ᐟ\\'))
//                                                                                                               })
//                                                                                                           }
//                                                                                                         }*/
// }

//export type SignInAT = ReturnType<typeof setSignInAC>
//export const signInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType

{
  /*(
                                      state: InitialStateType = initialState,
                                      action: SignInAT
                                    ): InitialStateType => {
                                      switch (action.type) {
                                        case '/SignIn/SET_SIGN_IN':
                                          return {
                                            ...state,
                                            email: action.email,
                                            password: action.password,
                                            rememberMe: action.rememberMe,
                                          }
                                        default:
                                          return state
                                      }
                                    }
                                    export const setSignInAC = (email: string, password: string, rememberMe: boolean) => {
                                      return {
                                        type: '/SignIn/SET_SIGN_IN',
                                        email,
                                        password,
                                        rememberMe,
                                      } as const
                                    }
    
    
                                    */
}

//export type ThunkSignInType= ThunkAction<void, RootStateType, unknown, ActionsType>
