import { useDispatch } from 'react-redux'

import { store } from '../app/store'

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
