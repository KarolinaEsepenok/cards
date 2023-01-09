import { TypedUseSelectorHook, useSelector } from 'react-redux'

import type { RootStateType } from '../../app/store'

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
