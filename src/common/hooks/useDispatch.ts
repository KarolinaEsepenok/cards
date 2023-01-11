import { useDispatch } from 'react-redux'

import type { AppDispatch } from '../../app/store'

export const useAppDispatch = <T>() => useDispatch<AppDispatch>()

//  useDispatch<ThunkDispatch<RootStateType, unknown, T extends AnyAction ? T : never>>()
