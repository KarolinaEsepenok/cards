export type InitialStateType = {
    password:string|null
    email:string|null,
    rememberMe:boolean,
    // isAuth:boolean

}
const initialState: InitialStateType = {
    email:'',
    password: '',
    rememberMe: true,
    // isAuth:false
}

export const signUpReducer = (state: any = initialState, action: any):any => {
    switch (action.type) {
        default:
            return state;
    }
};