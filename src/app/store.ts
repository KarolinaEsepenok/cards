import { configureStore } from '@reduxjs/toolkit'

// eslint-disable-next-line import/namespace
import { authReducer } from '../features/auth/authReducer'
import { passwordReducer } from '../features/auth/forgotPassword/forgotPassword-reducer'
import { registerReducer } from '../features/auth/register/registerReducer'
import { cardsReducer } from '../features/packs/cards/cardsReducer'
import { packsReducer } from '../features/packs/packsReducer'

import { appReducer } from './app-reducer'

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
