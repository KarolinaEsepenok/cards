import React from 'react';
import {NavLink} from "react-router-dom";

const SignIn = () => {
    return (
        <div>
           <h2> SignIn</h2>
            <div><input/></div>
            <div><input/></div>
            <label><input type={"checkbox"}/> remember me</label>
            <div><NavLink to={'/passwordRecovery'}>Forgot?</NavLink></div>
            <div><button>Sign In</button></div>
            <div><NavLink to={'/signUp'}>Sign Up!</NavLink></div>
        </div>
    );
};

export default SignIn;