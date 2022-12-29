import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});
export const authAPI = {
    me() {
        return instance.post(`auth/me`)
    },
    signIn(loginData:LoginDataType) {
        return instance.post<UserDataType>(`auth/login`, loginData)
    },
    logout() {
        return instance.delete(`auth/me`)
    }

};

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    // rememberMe: false - куки умрут через 3 часа
    // rememberMe: false: true - куки умрут через 7 часов
}
export type UserDataType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date
    updated: Date
    __v: number
    token: string
    tokenDeathTime: number
    avatar?: string
    error?: string
    deviceTokens: DeviceTokenType[]
}
type DeviceTokenType = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}
