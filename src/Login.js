import React from "react";
import { SignUpPopUp } from "./js/SignUpPop.js";
import { LoginPopUp } from "./js/LoginPop.js";
import logo from "./img/logo.png";
import "./css/login.css";

export default function Login() {
  return (
    <>
      <div style={{ minHeight: 800, minWidth: 1200, marginTop: 150 }}>
        <div style={{ marginTop: 50 }}>
          <section className="mainSection">
          <section className="loginSection">
          <LoginPopUp />
          </section>
          <section className="logoSection">
          <img src={logo} alt="Logo" width="600" height="150" />
          </section>
          <section className="signUpSection">
          <SignUpPopUp />
          </section>
          </section>
        </div>
      </div>
    </>
  );
}
