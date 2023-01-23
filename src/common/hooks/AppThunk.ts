import { ThunkAction } from 'redux-thunk'

import { RootStateType } from 'app/store'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, any>
