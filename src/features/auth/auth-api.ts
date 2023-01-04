import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true,
});
export const authAPI = {
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
