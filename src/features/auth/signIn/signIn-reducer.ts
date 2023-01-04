import {AnyAction, Dispatch} from 'redux'

import {authAPI, LoginDataType} from "../auth-api";


export type InitialStateType = {
    password: string | null
    email: string | null,
    rememberMe: boolean,


}

const initialState: InitialStateType = {
    email: '',
    password: '',
    rememberMe: true,

}

type ActionsType = SignInAT
export type SignInAT = ReturnType<typeof setSignInAC>
//export const signInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType
export const signInReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case '/SignIn/SET_SIGN_IN':
            return {
                ...state,email:action.email, password:action.password,remember:action.rememberMe
            }
        default:
            return state;
    }
};
export const setSignInAC = (email:string,password:string,rememberMe:boolean) => {
    return {
        type: '/SignIn/SET_SIGN_IN', email,password,rememberMe
    } as const
}

//export type ThunkSignInType= ThunkAction<void, RootStateType, unknown, ActionsType>

export const signInTC = (values: LoginDataType) => {
    return (dispatch: Dispatch) => {
        console.log(process.env)
        authAPI.signIn(values)
            .then(response => {
                if (response) {
                    dispatch(setSignInAC(response.data.email, response.data.password,response.data.rememberMe))

                }
            })
    }
}

