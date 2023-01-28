import React from 'react';
import {SignUpPopUp} from "./js/SignUpPop.js";
import {LoginPopUp} from "./js/LoginPop.js";
import logo from './img/logo.png';


export default function Login(){    

    return (
    <>
        <div style = {{minHeight: 800, marginTop: 20 }}>
            <h1>Zero Budgeting</h1>
            <img src={logo} alt="Logo" width="800" height="400"/> 
                <div style = {{marginTop: 50 }} >
                    <LoginPopUp/>
                    <SignUpPopUp/>
                </div>
        </div>
    </>
    )
}
