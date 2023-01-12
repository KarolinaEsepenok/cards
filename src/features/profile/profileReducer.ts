import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setError } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'
import { authAPI, ResponseProfileUserType, UpdateProfileName } from '../auth/auth-api'

const initialState = {
  name: 'My name',
  avatar: '',
  email: 'My email',
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    updateProfileNameAC(state, action: PayloadAction<{ data: ResponseProfileUserType }>) {
      // state.name = action.payload.data.updatedUser.name
      state.name = action.payload.data.updatedUser.name
    },
  },
})

export const profileReducer = slice.reducer
export const { updateProfileNameAC } = slice.actions

//thunk
export const updateProfileNameTC =
  (data: UpdateProfileName) => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      const profileData = getState().profile

      const apiModel = {
        name: profileData.name,
        avatar: profileData.avatar,
        ...data,
      }
      const res = await authAPI.updateProfileName(apiModel)

      dispatch(updateProfileNameAC({ data: res.data }))
    } catch (error) {
      dispatch(setError(error))
    }
  }
