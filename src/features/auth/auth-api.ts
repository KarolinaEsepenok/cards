import axios from "axios";

export const instance = axios.create({
   // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
     baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    signIn(loginData:LoginDataType) {
        return instance.post(`auth/login`, loginData)
    },
    signUp(signUpData:SignUpDataType) {
        return instance.post(`/auth/register`, signUpData)
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
export type SignUpDataType={
    email: string
    password: string
}



{/*const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true,
});*/}