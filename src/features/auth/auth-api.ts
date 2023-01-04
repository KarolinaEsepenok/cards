import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:7542/2.0/' ,
    withCredentials: true,
});
export const authAPI = {
    signIn(loginData:LoginDataType) {
        return instance.post(`auth/login`, loginData)
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



{/*const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true,
});*/}