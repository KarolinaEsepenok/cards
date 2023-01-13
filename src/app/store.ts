import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '../features/auth/authReducer'
import { passwordReducer } from '../features/auth/forgotPassword/forgotPassword-reducer'
import { registerReducer } from '../features/register/registerReducer'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    // signIn: signInReducer,
    // profile: profileReducer,
    password: passwordReducer,
    register: registerReducer,
    auth: authReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
