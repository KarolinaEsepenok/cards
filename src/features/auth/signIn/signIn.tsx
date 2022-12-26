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
                            <Field className={s.inputEmail}
                                   name="password"/>

                            <label className={s.rememberMeLable}>Remember Me
                                <Field type="checkbox" name="rememberMe"/>

                            </label>
                            <div className={s.forgotPassword}><NavLink to={'/passwordRecovery'}>Forgot password?</NavLink></div>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Sign In</Button>
                            <div><NavLink to={'/signUp'}>Sign Up!</NavLink></div>

                        </FormGroup>
                    </FormControl>
                </form>
            </Formik>


            <h2> SignIn</h2>
            <div><input/></div>
            <div><input/></div>
            <label><input type={"checkbox"}/> remember me</label>
            <div><NavLink to={'/passwordRecovery'}>Forgot?</NavLink></div>
            <div>
                <button>Sign In</button>
            </div>
            <div><NavLink to={'/signUp'}>Sign Up!</NavLink></div>
        </div>
    );
}

export default SignIn;