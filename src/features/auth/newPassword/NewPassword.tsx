import React from 'react';
import {getSignInTC, signInTC} from "../signIn/signIn-reducer";
import {useFormik} from "formik";
import {useDispatch, useSelector} from 'react-redux';
import s from "../signIn/signIn.module.scss";
import {CommonInput} from "../../../common/component/generalComponents/Input/CommonInput";
import {CommonButton} from "../../../common/component/generalComponents/Button/CommonButton";
import {NavLink} from "react-router-dom";
import {CommonCheckbox} from "../../../common/component/generalComponents/Checkbox/CommonCheckbox";

const NewPassword = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true,
        },
        onSubmit: (values) => {
            // @ts-ignore
            dispatch(signInTC(values))
        },
    })


    return (
        <div>
            <div className={s.loginContainer}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Sign in</h2>

                    <div className={s.label}>
                        <label className={s.loginNameLabel} htmlFor={'email'}>Email</label>

                        <CommonInput
                            type="email"
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />

                        <label  className={s.loginNameLabel}  htmlFor={'password'}>Password</label>

                        <CommonInput
                            type="password"
                            id={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>

                    <div className={s.remember}>
                        <CommonCheckbox
                            id="rememberMe"
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
                        />
                        <label htmlFor={'rememberMe'}>Remember me</label>
                    </div>

                    <div className={s.header}>
                        <NavLink to={'/forgot'}>Forgot password?</NavLink>
                    </div>

                    <CommonButton type={'submit'} className={s.mainButton}>
                        Sign in
                    </CommonButton>

                    <div className={s.span}>
                        <span>Don&apos;t have an account?</span>

                        <NavLink to="/signUp">Sign Up</NavLink>
                    </div>
                </form>

            </div>
            )
        </div>
    );
};

export default NewPassword;