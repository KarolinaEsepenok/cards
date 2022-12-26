import {Dispatch} from 'redux'


const initialState: InitialStateType = {
    email:'',
    password: ''
}

export const signInReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export type InitialStateType = {
    password:string
    email:string

}

