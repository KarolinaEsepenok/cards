import {AnyAction, Dispatch} from 'redux'

import {authAPI, LoginDataType, SignUpDataType} from "../auth-api";


export type InitialStateType = {
    password: string | null
    email: string | null,
}

const initialState: InitialStateType = {
    password: '',
    email: '',
}

//type ActionsType = SignUpAT
//export type SignUpAT = ReturnType<typeof setSignUpAC>
//export const signInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType

export const signUpReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case '/SignUp/SET_SIGN_UP':
            return {
                ...state,
                //email: action.email, password: action.password
            }
        default:
            return state;

    }}
    ;
    const setSignUpAC = (email: string | null, password: string | null) => {
        return {
            type: '/SignUp/SET_SIGN_UP', email, password
        } as const
    }

//export type ThunkSignInType= ThunkAction<void, RootStateType, unknown, ActionsType>

    export const signUpTC = (values: SignUpDataType) => {
        return (dispatch: Dispatch) => {
            console.log(process.env)
            authAPI.signUp(values)
                .then(response => {
                    if (response) {
                        dispatch(setSignUpAC(response.data.email, response.data.password))

                    }
                })
        }
    }



