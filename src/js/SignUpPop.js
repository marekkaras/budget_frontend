import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, fetchToken } from "./Auth.js";
import { useState } from "react";

// Outer class component
export class SignUpPopUp extends React.Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  render() {
    return (
      <div>
      {this.state.seen ? <SignUp toggle={this.togglePop} /> : null}
      {this.state.seen ? null : <div className="login-btn" onClick={this.togglePop}><button className="menuButton">Sign Up</button></div>}
      </div>
    );
  }
}

// Inner model class component
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { error_msg: "" };
    this.handler = this.handler.bind(this);
  }


  handleClick = () => {
    this.props.toggle();
  };
  
  handler( text ) {
    this.setState({
      error_msg: text,
    });
  }

  render() {
    return (
      <div className="modal-login">
        <div className="modal_content_login">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <SignUpBox handler={this.handler}/>
          <div className="modal_error_message">
          <p>{this.state.error_msg}</p>
          </div>
        </div>
      </div>
    );
  }
}

// Login function rendering all controls and processing everything
function SignUpBox( {handler}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");

  const createUser = () => {
    if (
      username === "" &&
      password === "" &&
      full_name === "" &&
      email === ""
    ) {
      handler("Missing required data");
      return;
    } else {
      let json_axios = axios.create({
        headers: { "content-type": "application/json" },
      });
      json_axios
        .post("http://127.0.0.1:8045/create_user/", {
          username: username,
          password: password,
          email: email,
          full_name: full_name,
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            loginAfterRegistering();
          }
        })
        .catch(function (error) {
          handler(error.response.data.detail);
        });
    }
  };

  const loginAfterRegistering = () => {
    if (username === "" && password === "") {
      return;
    } else {
      let urlencoded_axios = axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      urlencoded_axios
        .post("http://127.0.0.1:8045/token", {
          username: username,
          password: password,
        })
        .then(function (response) {
          if (response.data.access_token) {
            setToken(response.data.access_token);
            navigate("/profile");
          }
        })
        .catch(function (error) {
          // Do some error processing here
          console.log(error, "error");
        });
    }
  };

  return (
    <>
      {fetchToken() ? (
        <p>You are logged in!</p>
      ) : (
        <form className="sign-up-form">
          <label style={{ marginRight: 10 }}>Username: </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <br></br>
          <label style={{ marginRight: 10 }}>Password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <label style={{ marginRight: 10 }}>Email: </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <br></br>
          <label style={{ marginRight: 10 }}>Full Name: </label>
          <input type="text" onChange={(e) => setFullName(e.target.value)} />
          <br></br>
          <button type="button" onClick={createUser} className="loginButton">
            Create User
          </button>
        </form>
      )}
    </>
  );
}
