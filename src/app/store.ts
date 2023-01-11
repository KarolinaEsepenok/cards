import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    ignIn: signInReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
