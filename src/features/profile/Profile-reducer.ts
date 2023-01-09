import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppDispatch, RootStateType } from '../../app/store'
import { ResponseProfileUserType, authAPI, UpdateProfileName } from '../auth/auth-api'

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
    // updateProfileNameAC(state, action: PayloadAction<{ data: UpdateProfileName }>) {
    updateProfileNameAC(state, action: PayloadAction<{ data: ResponseProfileUserType }>) {
      state = action.payload.data
    },
  },
})

export const profileReducer = slice.reducer
export const { updateProfileNameAC } = slice.actions

//thunk
export const updateProfileNameTC =
  (data: UpdateProfileName) => async (dispatch: AppDispatch, getState: () => RootStateType) => {
    try {
      const profileData = getState().profile

      const apiModel = {
        name: profileData.name,
        avatar: profileData.avatar,
        ...data,
      }
      const res = await authAPI.updateProfileName(apiModel)

      console.log(res)

      dispatch(updateProfileNameAC(res.data.updatedUser))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }
