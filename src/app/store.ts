import { configureStore } from '@reduxjs/toolkit'

import { passwordReducer } from '../features/auth/forgotPassword/forgotPassword-reducer'
import { signInReducer } from '../features/auth/signIn/signIn-reducer'
import { profileReducer } from '../features/profile/profileReducer'
import { registerReducer } from '../features/register/registerReducer'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    signIn: signInReducer,
    profile: profileReducer,
    password: passwordReducer,
    register: registerReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
