import {Dispatch} from 'redux'


type InitialStateType=typeof initialState

export type SetAppInitializedAT=ReturnType<typeof setAppInitializedAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>

type ActionsType =SetAppInitializedAT| SetAppErrorAT | SetAppStatusAT

const initialState= {
    isAppInitialized: false,
    error:null as null|string,
    isLoading:false
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-APP-INITIALIZED':
            return {...state, isAppInitialized: action.value}
        case 'app/SET-ERROR':
            return {...state, error: action.error}
        case 'app/SET-IS-LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}
export const setAppInitializedAC = (value: boolean) => ({type: 'app/SET-APP-INITIALIZED', value} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'app/SET-ERROR', error} as const)
export const setAppStatusAC = (isLoading:boolean) => ({type: 'app/SET-IS-LOADING',isLoading} as const)


