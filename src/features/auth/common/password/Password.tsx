import React, {useState} from 'react';
import s from "../../signIn/signIn.module.scss";
import {Field} from "formik";
import eysPassword from "../../../../assets/img/icons/eysPassword.svg";
type PasswordPropsType={
    namePassword:string
}


const Password = (props:PasswordPropsType) => {
    const [seePassword, setSeePassword] = useState(false)
    const showPassword = () => {
        setSeePassword(true)
    }
    const unShowPassword = () => {
        setSeePassword(false)
    }
    return (

            <label className={s.label}>
                <div className={s.loginNameLabel}>{props.namePassword}</div>
                {seePassword ? <> <Field className={s.loginInputLabel} type="text" name="password" />
                        <div className={s.eysPasswordBtn} onClick={unShowPassword}><img src={eysPassword} alt={'eys'}/></div></>
                    : <><Field className={s.loginInputLabel} type="password" name="password" minlenght="4"
                               maxlenght="20" />
                        <div className={`${s.eysPasswordBtnActive}`} onClick={showPassword}><img src={eysPassword} alt={'eys'}/></div>
                    </>}
</label>

    )}
export default Password