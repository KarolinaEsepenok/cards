import React from 'react';
import 'react-app-polyfill/ie11';
import {FormikProvider, useFormik} from 'formik';
import Password from "../common/password/Password";
import s from "../signIn/signIn.module.scss";
import {NavLink} from "react-router-dom";
import {Button, FormControl, FormGroup} from "@mui/material";
import * as Yup from 'yup';
import {CommonInput} from "../../../common/component/generalComponents/Input/CommonInput";
import {useDispatch} from "react-redux";

import {signUpTC} from "./signUp-reducer";



const SignUp = () => {
   const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            // @ts-ignore
            dispatch(signUpTC(values))
        },
    })
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

                            /> {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <label  className={s.loginNameLabel}  htmlFor={'password'}>Password</label>
                            <CommonInput
                                type="password"
                                id='password'
                                name='password' onChange={formik.handleChange} value={formik.values.password}
                            />{formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <label  className={s.loginNameLabel}  htmlFor={'password'}>Confirm password</label>
                            <CommonInput
                                type="password"
                                id='confirmPassword'
                                name='password' onChange={formik.handleChange} value={formik.values.password}
                            />
                           {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        </div>
                        <Button className={s.loginBtn} type={'submit'} variant={'contained'} color={'primary'}>Sign
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