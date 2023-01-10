import axios from 'axios'

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
  me() {
    return instance.post('auth/me')
  },
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
