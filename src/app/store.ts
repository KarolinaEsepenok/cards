import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    signIn: signInReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
