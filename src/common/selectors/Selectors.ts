import { RootStateType } from '../../app/store'

export const emailSelector = (state: RootStateType) => state.auth.email
export const nameSelector = (state: RootStateType) => state.auth.name
export const isLoggedInSelector = (state: RootStateType) => state.app.isLoggedIn
export const isAppInitialize = (state: RootStateType) => state.app.isAppInitialized
export const forgotPasswordSelector = (state: RootStateType) => state.password.forgotPassword
export const changePasswordSelector = (state: RootStateType) => state.password.changePasswordSuccess
export const currentEmailSelector = (state: RootStateType) => state.password.currentEmail
export const registerSelector = (state: RootStateType) => state.register.register
export const isLoadingSelector = (state: RootStateType) => state.app.isLoading
