import {Dispatch} from 'redux'
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../auth-api";
import {RootStateType} from "../../../app/store";

export type InitialStateType = {
    password:string|null
    email:string|null,
    rememberMe:boolean,
    isAuth:boolean

}

const initialState: InitialStateType = {
    email:'',
    password: '',
    rememberMe: true,
    isAuth:false
}

type ActionsType=ReturnType<typeof setSignInAC>

export const signInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case '/SignIn/SET_SIGN_IN':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};
export const setSignInAC = (email:string|null,password:string|null,rememberMe:boolean,isAuth:boolean) => {
    return {
        type: '/SignIn/SET_SIGN_IN', payload:{ email,password, rememberMe,isAuth}
    } as const
}

export type ThunkSignInType= ThunkAction<void, RootStateType, unknown, ActionsType>
export const getSignInTC=():ThunkSignInType=>{
    return  (dispatch:Dispatch)=>{
        authAPI.me()
            .then(response => {
                if (response) {
                    dispatch(setSignInAC(response.data.password, response.data.email, response.data.rememberMe, true))
                }
            })
    }}
export const signInTC=(values:any):ThunkSignInType=>
    async (dispatch:Dispatch<ActionsType>)=>{
    try{
        const res = await authAPI.signIn(values)
        }catch (e){

    }

}


