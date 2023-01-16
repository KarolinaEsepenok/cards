import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '../features/auth/authReducer'
import { passwordReducer } from '../features/auth/forgotPassword/forgotPassword-reducer'
import { registerReducer } from '../features/auth/register/registerReducer'
import { packsReducer } from '../features/packs/packsReducer'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    password: passwordReducer,
    register: registerReducer,
    auth: authReducer,
    packs: packsReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
