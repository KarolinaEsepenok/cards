import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import s from './signIn.module.scss'
import {Field, Formik} from "formik";
import {FormControl, FormGroup, Button} from "@mui/material";
import eysPassword from '../../../assets/img/icons/eysPassword.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../app/store";
import {getSignInTC} from "./signIn-reducer";
import Password from "../common/password/Password"


{/*interface Values {
    email: string,
    password: string,
    rememberMe: boolean,
    isAuth:boolean

email: '',
    password: '',
    rememberMe: false,

}*/}
const initialValues = {
    isAuth:false
}
const SignIn = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.signIn.isAuth);

    const onSubmit = (values:any) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
        }, 500)
   // @ts-ignore
   // dispatch(getSignInTC(values))
}
    {/*} const onSubmit = (values: Values,
                      {setSubmitting}: FormikHelpers<Values>) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 500);*/}
    {/*} const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: "",
            password: "",
            rememberMe:false
        }

    })*/}

    {/*}   if (isAuth) {
        return <Redirect to={"/"} />
    }
     onSubmit: any => {
            // @ts-ignore
            dispatch(getSignInTC(values));
        }
    */}


    return (
        <div className={s.loginContainer}>
            <h1 className={s.loginNameContainer}>Sign In</h1>
            <Formik onSubmit={onSubmit} initialValues={initialValues}
               >
                <form>
                    <FormControl>
                        <FormGroup>
                            <label className={s.label}>
                                <div className={s.loginNameLabel}>Email</div>
                                <Field className={s.loginInputLabel} name="email"  /></label>

                            <Password namePassword={'Password'}/>

                            <label className={s.rememberMeLable}>Remember Me
                                <Field type="checkbox" name="rememberMe"/>
                            </label>
                            <NavLink className={s.forgotPassword} to={'/password'}>Forgot
                                password?</NavLink>
                            <Button className={s.loginBtn} type={'submit'}  variant={'contained'} color={'primary'}>Sign
                                In</Button>
                            <div className={s.loginQuestion}>Don't have an account?</div>
                            <NavLink className={s.loginLink} to={'/signUp'}>Sign Up</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Formik>


        </div>
    );
}

export default SignIn;