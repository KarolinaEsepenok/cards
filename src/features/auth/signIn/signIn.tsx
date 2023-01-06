import React from 'react';
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import s from './signIn.module.scss'
import { useFormik} from "formik";
import {FormControl, FormGroup, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CommonInput} from "../../../common/component/generalComponents/Input/CommonInput";
import {CommonCheckbox} from "../../../common/component/generalComponents/Checkbox/CommonCheckbox";
import {signInTC} from "./signIn-reducer";
import {RootStateType} from "../../../app/store";


const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isAppInitialized = useSelector<RootStateType>(state => state.app.isAppInitialized)
    const signIn = useSelector<RootStateType>(state=> state.signIn)


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
            if(values.password.length<=7){
                return {
                    password:'Password should be longer then 7 symbols!'
                }
            }
        },
        onSubmit:  values => {
            // @ts-ignore
            dispatch(signInTC(values))
        },
    })
    {/*   if (signIn) {
        return <Navigate to={"/profile"} />
    }
     if (!signIn) {
        return <Navigate to={"/signUp"} />
    }*/}

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
                                /> {formik.errors.email ? <div className={s.loginError}>{formik.errors.email}</div> : null}
                                <label  className={s.loginNameLabel}  htmlFor={'password'}>Password</label>
                                <CommonInput
                                    type="password"
                                    id={'password'}
                                    {...formik.getFieldProps("password")}
                                />{formik.errors.password ?
                                <div className={s.passwordError}>{formik.errors.password}</div> : null}
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
                          <Button  type={'submit'}  variant={'contained'} color={'primary'} sx={{marginTop:3,fontFamily: 'Montserrat'}}>Sign In</Button>

                            <div className={s.loginQuestion}>Don't have an account?</div>
                            <NavLink className={s.loginLink} to={'/signUp'}>Sign Up</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
        </div>
    );
}

export default SignIn;