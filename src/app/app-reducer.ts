import {Dispatch} from 'redux'

//настройка темы. то что нужно для всего приложения
const initialState: InitialStateType = {
    password: ''
}

export const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export type InitialStateType = {
    password:string

}

