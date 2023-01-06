import React from 'react';
import 'react-app-polyfill/ie11';
import {FormikProvider, useFormik} from 'formik';
import Password from "../common/password/Password";
import s from "../signIn/signIn.module.scss";
import {Navigate, NavLink, useNavigate} from "react-router-dom";

import {Button, FormControl, FormGroup} from "@mui/material";
import * as Yup from 'yup';
import {CommonInput} from "../../../common/component/generalComponents/Input/CommonInput";
import {useDispatch} from "react-redux";
import {signUpTC} from "./signUp-reducer";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../app/store";


export type FormikErrorType = {
    email?: string|null
    password?: string|null
    confirmPassword?: string|null
}


const SignUp = () => {
    const navigate = useNavigate();
   const dispatch = useDispatch()
    const isAppInitialized = useSelector<RootStateType>(state => state.app.isAppInitialized)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword:''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 5)
                errors.password = 'Password should be longer then 5 simbols!'
            if (values.password !== values.confirmPassword)
                errors.confirmPassword = "Passwords don't match"

            return errors
        },
        onSubmit: values => {
            const data = { email: values.email, password: values.password,confirmPassword:values.confirmPassword }
            // @ts-ignore
            dispatch(signUpTC(data))
        },

    })
    {/*if (!isAppInitialized) {
        return<Navigate to={'signIn'}/>
    }*/}

    return (
        <div className={s.loginContainer}>
            <h1 className={s.loginNameContainer}>Signup</h1>
            <FormikProvider value={formik}>
           <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <>
                        <div className={s.label}>
                            <label className={s.loginNameLabel} htmlFor={'email'}>Email</label>
                            <CommonInput
                                type="email"
                                id="email"
                                name='email' onChange={formik.handleChange} value={formik.values.email}

                            /> {formik.errors.email ? <div className={s.loginError}>{formik.errors.email}</div> : null}
                            <label  className={s.loginNameLabel}  htmlFor={'password'}>Password</label>
                            <CommonInput
                                type="password"
                                id='password'
                                name='password' onChange={formik.handleChange} value={formik.values.password}
                            />{formik.errors.password ? <div className={s.passwordError}>{formik.errors.password}</div> : null}
                            <label  className={s.loginNameLabel}  htmlFor={'password'}>Confirm password</label>
                            <CommonInput
                                type="password"
                                id='confirm_Password'
                                name='confirm_password' onChange={formik.handleChange} value={formik.values.confirmPassword}
                            />
                           {formik.errors.confirmPassword ? <div className={s.confPasswordError}>{formik.errors.confirmPassword}</div> : null}
                        </div>
                        <Button className={s.loginBtn} type={'submit'} variant={'contained'} color={'primary'} sx={{marginTop:3 , fontFamily: 'Montserrat'}}>Sign
                            Up</Button>
                        <div className={s.loginQuestion}>Already have an account?</div>
                        <NavLink className={s.loginLink} to={'/signIn'}>Sign In</NavLink>
                        </>
                    </FormGroup>
                </FormControl>
            </form> </FormikProvider>

</div>
)
    ;
};
export default SignUp;

{/*  onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
              <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
        }}

            validationSchema={Yup.object<Record<keyof Values, Yup.AnySchema>>().shape({
            email: Yup.string()
                .email("Invalid email address")
                .required("Please enter email"),
            password: Yup.string().required("Please enter password"),
            confirmPassword: Yup.string().required("Please enter confirm password"),
        })}>



                */
}