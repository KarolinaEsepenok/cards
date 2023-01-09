import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { signInReducer } from '../features/auth/signIn/signIn-reducer'
import { profileReducer } from '../features/profile/Profile-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  signIn: signInReducer,
  profile: profileReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootStateType = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store

// export type AppDispatch = ReturnType<typeof store.dispatch>

export type AppDispatch = typeof store.dispatch

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootStateType,
//   unknown,
//   Action<string>
// >
