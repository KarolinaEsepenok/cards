
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {newPasswordReducer} from "../features/auth/newPassword/newPassword-reducer";
import {passwordRecoveryReducer} from "../features/auth/passwordRecovery/passwordRecovery-reducer";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {SignInAT, signInReducer} from "../features/auth/signIn/signIn-reducer";
import {SignUpAT, signUpReducer} from "../features/auth/signUp/signUp-reducer";
import SignUp from "../features/auth/signUp/signUp";


const rootReducer = combineReducers({
    app:appReducer,
    signIn:signInReducer,
    signUp:signUpReducer,
    newPassword:newPasswordReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile:profileReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootStateType = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store;










export type ActionsType= SignInAT |SignUpAT
export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsType>
//export type AppThunk= ThunkAction<void, RootStateType, unknown, AnyAction>
