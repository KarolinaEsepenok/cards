
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {newPasswordReducer} from "../features/auth/newPassword/newPassword-reducer";
import {passwordRecoveryReducer} from "../features/auth/passwordRecovery/passwordRecovery-reducer";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {signInReducer} from "../features/auth/signIn/signIn-reducer";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app:appReducer,
    signIn:signInReducer,
    newPassword:newPasswordReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile:profileReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type RootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
