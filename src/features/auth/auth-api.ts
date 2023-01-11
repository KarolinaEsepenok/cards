import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

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
    return instance.post('/auth/register', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
}
// {
//   addedUser: {
//   ... // не важные данные, просто для проверки
//   } // чтобы посмотреть как выглядит созданный юзер
//
//   error?: string;
// }
export type RegisterType = {
  email: string
  password: string
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
