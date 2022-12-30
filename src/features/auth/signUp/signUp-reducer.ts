import {InitialStateType} from "../signIn/signIn-reducer";

export const signUpReducer = (state: any, action: any):any => {
    switch (action.type) {
        case '/SignUp/SET_SIGN_UP':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};