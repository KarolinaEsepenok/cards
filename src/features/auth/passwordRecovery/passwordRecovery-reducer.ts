import {Dispatch} from 'redux'


const initialState: InitialStateType = {
    password: ''
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export type InitialStateType = {
    password:string

}

