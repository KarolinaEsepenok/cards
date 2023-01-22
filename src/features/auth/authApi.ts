import { AxiosResponse } from 'axios'

import { instance } from '../../common/axiosInstance/axiosInstance'

const payload = {
  form: 'test-front-admin <ai73a@yandex.by>',
  message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
}

export const authApi = {
  signIn(loginData: RequestLoginType) {
    return instance.post<'', AxiosResponse<ResponseUserType>, RequestLoginType>(`auth/login`, loginData)
  },
  updateProfileName(data: UpdateProfileName) {
    return instance.put<'', AxiosResponse<ResponseProfileUserType>, UpdateProfileName>('auth/me', data)
  },
  registration(data: RequestRegisterType) {
    return instance.post<'', AxiosResponse<ResponseRegisterType>, RequestRegisterType>('auth/register', data)
  },
  logout() {
    return instance.delete<'', CommonType>('auth/me')
  },
  forgotPassword(email: string) {
    return instance.post<'', AxiosResponse<CommonType>, RequestForgotPasswordType>('auth/forgot', { email, ...payload })
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<'', AxiosResponse<CommonType>, RequestSetNewPasswordType>('auth/set-new-password', {
      password,
      resetPasswordToken,
    })
  },
  me() {
    return instance.post<'', AxiosResponse<ResponseUserType>>('auth/me')
  },
}

//types
export type ResponseRegisterType = {
  addedUser: {}
  error?: string
}

export type RequestRegisterType = {
  email: string
  password: string
}

export type RequestForgotPasswordType = {
  email: string
  from?: string

  message: string
}

export type RequestSetNewPasswordType = {
  password: string
  resetPasswordToken: string
}

export type CommonType = {
  info: string
  error?: string
}

export type RequestLoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ResponseUserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}

export type UpdateProfileName = {
  name?: string
  avatar?: string
}

export type ResponseProfileUserType = {
  updatedUser: ResponseUserType
  error?: ''
}
