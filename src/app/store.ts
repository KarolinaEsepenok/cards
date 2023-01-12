import { configureStore } from '@reduxjs/toolkit'

import { passwordReducer } from '../features/auth/forgotPassword/forgotPassword-reducer'
import { signInReducer } from '../features/auth/signIn/signIn-reducer'
import { profileReducer } from '../features/profile/profileReducer'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    signIn: signInReducer, // @ts-ignore
    profile: profileReducer, // @ts-ignore
    password: passwordReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
