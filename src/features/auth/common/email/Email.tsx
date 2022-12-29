import React from 'react';
import s from "../../signIn/signIn.module.scss";
import {Field} from "formik";

const Email = () => {
    return (
        <div className={s.emailInput}>
            <label className={s.label}></label>
            <div className={s.loginNameLabel}>Email</div>
            <Field className={s.loginInputLabel} name="email"  />

        </div>
    );
};

export default Email;