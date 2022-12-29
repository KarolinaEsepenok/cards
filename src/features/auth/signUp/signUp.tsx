import React from 'react';

import 'react-app-polyfill/ie11';

import {Formik, Field, FormikHelpers} from 'formik';
import Password from "../common/password/Password";
import s from "../signIn/signIn.module.scss";
import {NavLink} from "react-router-dom";
import {Button, FormControl, FormGroup} from "@mui/material";
import * as Yup from 'yup';


interface Values {
    email: string;
    password: string;
    confirmPassword: string
}

const SignUp = () => {
    return (
        <div className={s.loginContainer}>
            <h1 className={s.loginNameContainer}>Signup</h1>
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

            <form>

                <FormControl>

                    <FormGroup>
                        <label className={s.label}>
                            <div className={s.loginNameLabel}>Email</div>
                            <Field className={s.loginInputLabel}
                                   name="email"
                            /></label>
                        <Password namePassword={'Password'}/>
                        <Password namePassword={'Confirm password'}/>
                        <Button className={s.loginBtn} type={'submit'} variant={'contained'} color={'primary'}>Sign
                            Up</Button>
                        <div className={s.loginQuestion}>Already have an account?</div>
                        <NavLink className={s.loginLink} to={'/signIn'}>Sign In</NavLink>

                    </FormGroup>
                </FormControl></form>
        </Formik>
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
                }}*/
}