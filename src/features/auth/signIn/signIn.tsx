import React from 'react';
import {NavLink} from "react-router-dom";
import s from './signIn.module.scss'
import {ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik} from "formik";
// @ts-ignore

import {FormControl, FormGroup, FormLabel, TextField, Button, Checkbox, FormControlLabel} from "@mui/material";

interface Values {
    email: string;
    password: string;
    rememberMe: boolean
}

const SignIn = () => {
    {/*} const dispatch = useDispatch()

    const isLoggedIn = useSelector<RootStateType>(state => state.signIn);

    const formik = useFormik({
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
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            //dispatch(loginTC(values));
        },
    })
*/
    }


    return (
        <div className={s.loginContainer}>
            <h1>Sign In</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false
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
            >
                <form className={s.formContainer}>
                    <FormControl>
                        <FormGroup>
                            <label className={s.loginLabel}>Email</label>
                            <Field className={s.inputEmail}
                                   name="email"
                            />
                            <label className={s.loginLabel}>Password</label>
                            <Field className={s.inputEmail} type="password"
                                   name="password"/>

                            <label className={s.rememberMeLable}>Remember Me
                                <Field type="checkbox" name="rememberMe"/>

                            </label>
                            <div className={s.forgotPassword}><NavLink to={'/passwordRecovery'}>Forgot password?</NavLink></div>
                            <Button className={s.loginBtn} type={'submit'} variant={'contained'} color={'primary'}>Sign In</Button>
                            <div className={s.singInQuestion}>Already have an account?</div>
                            <div><NavLink to={'/signUp'}>Sign Up!</NavLink></div>

                        </FormGroup>
                    </FormControl>
                </form>
            </Formik>


        </div>
    );
}

export default SignIn;