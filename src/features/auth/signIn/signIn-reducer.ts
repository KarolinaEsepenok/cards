import {Dispatch} from 'redux'
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../auth-api";

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

export type ThunkSignInType= ThunkAction<void, ActionsType, unknown, any>
export const getSignInTC=():ThunkSignInType=>{
    return  (dispatch:Dispatch)=>{
        authAPI.me()
            .then(response => {
                if (response) {
                    dispatch(setSignInAC(response.data.password, response.data.email, response.data.rememberMe, true))
                }
            })
    }}
export const signIn=(email:string,password:string, rememberMe:boolean)=>(dispatch:Dispatch<ActionsType>)=>{
    authAPI.signIn(email,password, rememberMe)
        .then(response => {
            if(response){
                dispatch(setSignInAC(response.data.password, response.data.email,response.data.rememberMe,true))

                //let {id, email,login} = response.data.data
                //dispatch(setAuthUserData(id, email, login, true))

            }else{
                {/*}     let message = response.data.message.length > 0 ? response.data.message[0]: "Some Error"
                dispatch(getSignInTC())*/}
            }
        })
}


