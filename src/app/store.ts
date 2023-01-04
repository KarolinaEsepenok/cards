
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {newPasswordReducer} from "../features/auth/newPassword/newPassword-reducer";
import {passwordRecoveryReducer} from "../features/auth/passwordRecovery/passwordRecovery-reducer";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {SignInAT, signInReducer} from "../features/auth/signIn/signIn-reducer";
import {signUpReducer} from "../features/auth/signUp/signUp-reducer";


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
export type ActionsType= SignInAT
export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsType>
export type AppThunk= ThunkAction<void, RootStateType, unknown, ActionsType>


// @ts-ignore
window.store = store;
