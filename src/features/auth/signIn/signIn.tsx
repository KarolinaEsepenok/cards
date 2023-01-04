import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import s from './signIn.module.scss'
import {Field, Formik, useFormik} from "formik";
import {FormControl, FormGroup, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../app/store";

import {CommonInput} from "../../../common/component/generalComponents/Input/CommonInput";
import {CommonCheckbox} from "../../../common/component/generalComponents/Checkbox/CommonCheckbox";
import {signInTC} from "./signIn-reducer";
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const initialValues = {
    isAuth:false
}
const SignIn = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.signIn.isAuth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
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
        onSubmit: values => {
            dispatch(signInTC(values))
        },
    })

    return (
        <div className={s.loginContainer}>
            <h1 className={s.loginNameContainer}>Sign In</h1>
                <form onSubmit={formik.handleSubmit} >
                    <FormControl>
                        <FormGroup>
                            <div className={s.label}>
                                <label className={s.loginNameLabel} htmlFor={'email'}>Email</label>
                                <CommonInput
                                    type="email"
                                    id="email"
                                    {...formik.getFieldProps("email")}
                                /> {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                <label  className={s.loginNameLabel}  htmlFor={'password'}>Password</label>
                                <CommonInput
                                    type="password"
                                    id={'password'}
                                    {...formik.getFieldProps("password")}
                                />{formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            </div>
                            <div className={s.remember}>
                                <label htmlFor={'rememberMe'}>Remember me</label>
                                <CommonCheckbox
                                    id="rememberMe"
                                    {...formik.getFieldProps("rememberMe")}
                                    checked={formik.values.rememberMe}
                                />

                            </div>
                            <NavLink className={s.forgotPassword} to={'/password'}>Forgot
                                password?</NavLink>
                            <Button className={s.loginBtn} type={'submit'}  variant={'contained'} color={'primary'}>Sign
                                In</Button>
                            <div className={s.loginQuestion}>Don't have an account?</div>
                            <NavLink className={s.loginLink} to={'/signUp'}>Sign Up</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
        </div>
    );
}

export default SignIn;