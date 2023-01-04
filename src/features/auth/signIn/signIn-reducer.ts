import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from "redux-thunk";
import {authAPI, LoginDataType} from "../auth-api";
import {AppThunk, RootStateType} from "../../../app/store";

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
   // isAuth:false
}

type ActionsType= SignInAT
export type SignInAT=ReturnType<typeof setSignInAC>
export const signInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case '/SignIn/SET_SIGN_IN':
            return {
                ...state,
                isAuth:action.value,
            }
        default:
            return state;
    }
};
export const setSignInAC = (value:boolean) => {
    return {
        type: '/SignIn/SET_SIGN_IN', value
    } as const
}

//export type ThunkSignInType= ThunkAction<void, RootStateType, unknown, ActionsType>

export const signInTC=(values:LoginDataType):AppThunk=>{
    return  (dispatch:Dispatch)=>{
        authAPI.signIn(values)
            .then(response => {
                if (response) {
                    dispatch(setSignInAC(true))
                }
            })
    }}

