import { configureStore } from '@reduxjs/toolkit'

import { signInReducer } from '../features/auth/signIn/signIn-reducer'
import { profileReducer } from '../features/profile/profileReducer'
import { registerReducer } from '../features/register/registerReducer'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    signIn: signInReducer, // @ts-ignore
    profile: profileReducer, // @ts-ignore
    //password: passwordReducer,
    register: registerReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
