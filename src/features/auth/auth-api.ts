import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
const payload = {
  form: 'test-front-admin <ai73a@yandex.by>',
  message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
}

export const authAPI = {
  signIn(loginData: LoginDataType) {
    return instance.post(`auth/login`, loginData)
  },
  updateProfileName(data: UpdateProfileName) {
    return instance.put<'', AxiosResponse<ResponseProfileUserType>, UpdateProfileName>(
      '/auth/me',
      data
    )
  },
  registration(data: RegisterType) {
    return instance.post('https://neko-back.herokuapp.com/2.0/auth/register', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/me')
  },
  forgotPassword(email: string) {
    return axios.post<'', CommonForgotPasswordType>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      { email, ...payload }
    )
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<'', CommonForgotPasswordType>(
      'https://neko-back.herokuapp.com/2.0/auth/set-new-password',
      {
        password,
        resetPasswordToken,
      }
    )
  },
  me() {
    return instance.post('auth/me')
  },
}

export type RegisterType = {
  email: string
  password: string
}

type CommonForgotPasswordType = {
  info: string
  error: string
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
export type ResponseUserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}

export type UpdateProfileName = {
  name?: string
  avatar?: string
}

//answer from server
export type ResponseProfileUserType = {
  updatedUser: ResponseUserType
  error?: ''
}
