import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import s from './signIn.module.scss'
import { Field,  Formik, FormikHelpers} from "formik";
import {FormControl, FormGroup, Button} from "@mui/material";
import eysPassword from '../../../assets/img/icons/eysPassword.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../app/store";
import {getSignInTC} from "./signIn-reducer";

{/*interface Values {
    email: string,
    password: string,
    rememberMe: boolean,
    isAuth:boolean

}*/}
const initialValues = {
   email: '',
             password: '',
             rememberMe: false,
    isAuth:false



}
const SignIn = () => {
    const dispatch = useDispatch()

    const signIn = useSelector<RootStateType, boolean>(state => state.signIn.isAuth);

    const [seePassword, setSeePassword] = useState(false)
    const showPassword = () => {
        setSeePassword(true)
    }
    const unShowPassword = () => {
        setSeePassword(false)
    }
const onSubmit=(values:any)=> {
        // @ts-ignore
    dispatch(getSignInTC(values))
}

    {/*} const onSubmit = (values: Values,
                      {setSubmitting}: FormikHelpers<Values>) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 500);*/}

    return (
        <div className={s.loginContainer}>
            <h1>Sign In</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}>
                <form>
                    <FormControl>
                        <FormGroup>
                            <label className={s.label}>
                                <div className={s.loginNameLabel}>Email</div>
                                <Field className={s.inputLabel} name="email"/></label>

                            <label className={s.label}>
                                <div className={s.loginNameLabel}>Password</div>
                                {seePassword ? <> <Field className={s.inputLabel} type="text" name="password"/>
                                        <div className={s.eysPasswordBtn} onClick={unShowPassword}><img src={eysPassword} alt={'eys'}/></div></>
                                    : <><Field className={s.inputLabel} type="password" name="password" minlenght="4"
                                               maxlenght="20"/>
                                        <div className={`${s.eysPasswordBtnActive}`} onClick={showPassword}><img src={eysPassword} alt={'eys'}/></div>
                                    </>}
                            </label>
                            <label className={s.rememberMeLable}>Remember Me
                                <Field type="checkbox" name="rememberMe"/>
                            </label>
                            <NavLink className={s.forgotPassword} to={'/passwordRecovery'}>Forgot
                                password?</NavLink>
                            <Button className={s.loginBtn} type={'submit'} variant={'contained'} color={'primary'}>Sign
                                In</Button>
                            <div className={s.singInQuestion}>Already have an account?</div>
                            <NavLink to={'/signUp'}>Sign Up!</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Formik>


        </div>
    );
}

export default SignIn;