import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { authReducer } from 'pages/auth/authSlice'
import { passwordReducer } from 'pages/auth/forgotPassword/forgotPasswordReducer'
import { registerReducer } from 'pages/auth/register/registerReducer'
import { cardsReducer } from 'pages/cards/cardsSlice'
import { packsReducer } from 'pages/packs/packsSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    password: passwordReducer,
    register: registerReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
