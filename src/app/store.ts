import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { newPasswordReducer } from '../features/auth/newPassword/newPassword-reducer'
import { passwordRecoveryReducer } from '../features/auth/passwordRecovery/passwordRecovery-reducer'
import { SignInAT, signInReducer } from '../features/auth/signIn/signIn-reducer'
import { profileReducer } from '../features/profile/profile-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  signIn: signInReducer,
  newPassword: newPasswordReducer,
  passwordRecovery: passwordRecoveryReducer,
  profile: profileReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

export type ActionsType = SignInAT
export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsType>
//export type AppThunk= ThunkAction<void, RootStateType, unknown, AnyAction>
