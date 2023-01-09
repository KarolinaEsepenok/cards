import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import type { RootStateType } from '../../app/store'

export const useAppDispatch = <T>() =>
  useDispatch<ThunkDispatch<RootStateType, unknown, T extends AnyAction ? T : never>>()
