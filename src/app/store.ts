import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { SignInAT, signInReducer } from '../features/auth/signIn/signIn-reducer'
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

// //export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// export type RootStateType = ReturnType<typeof rootReducer>
//
// // @ts-ignore
// window.store = store
//
// export type ActionsType = SignInAT
// export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsType>
// //export type AppThunk= ThunkAction<void, RootStateType, unknown, AnyAction>

//я закоментила выше и это по доке внизу
export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

//for Toolkit
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
