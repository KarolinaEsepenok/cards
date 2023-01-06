import {AnyAction, Dispatch} from 'redux'

import {authAPI, LoginDataType, SignUpDataType} from "../auth-api";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";


 type InitialStateType = {
    password: string | null
    email: string | null,
  confirmPassword:string|null
}

const initialState: InitialStateType = {
    password: '',
    email: '',
    confirmPassword:''
}

//type ActionsType = SignUpAT
export type SignUpAT = ReturnType<typeof setSignUpAC>
//export const signInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType

export const signUpReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case '/SignUp/SET_SIGN_UP':
            return {
                ...state,
              email: action.email, password: action.password, confirmPassword:action.confirmPassword
            }
        default:
            return state;

    }}
    ;
    const setSignUpAC = (email: string | null, password: string | null, confirmPassword:string|null) => {
        return {
            type: '/SignUp/SET_SIGN_UP', email, password,confirmPassword
        } as const
    }
//export type ThunkSignInType= ThunkAction<void, RootStateType, unknown, ActionsType>
    export const signUpTC = (data: SignUpDataType) => {
        return (dispatch: Dispatch) => {
            dispatch(setAppStatusAC(true))
            console.log(process.env)
            authAPI.signUp(data)
                .then(response => {
                    if (response) {
                        dispatch(setSignUpAC(response.data.email, response.data.password, response.data.confirmPassword))
                        dispatch(setAppStatusAC(false))
                    }
                })
                .catch(error => {
                    dispatch(setAppErrorAC("not valid email/password /ᐠ-ꞈ-ᐟ\\"))
                })
        }


    }
