import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootStateType } from '../../app/store'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'
import { authAPI, ResponseProfileUserType, UpdateProfileName } from '../auth/auth-api'

const initialState = {
  name: '',
  avatar: '',
  email: '',
  // updatedUser: {
  //   _id: '',
  //   email: '',
  //   name: '',
  //   avatar: '',
  //   publicCardPacksCount: 10, // количество колод
  //   created: Date,
  //   updated: Date,
  //   isAdmin: false,
  //   verified: false, // подтвердил ли почту
  //   rememberMe: false,
  //   error: '',
  // },
  // error: '',
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    updateProfileNameAC(state, action: PayloadAction<{ data: ResponseProfileUserType }>) {
      // state = action.payload.data
      debugger
      state.name = action.payload.data.updatedUser.name //?????????
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

      debugger

      dispatch(updateProfileNameAC({ data: res.data }))
      console.log(res.data.updatedUser)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }
