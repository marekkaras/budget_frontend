import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, fetchToken } from "./Auth.js";
import { useState } from "react";

// Outer class component
export class LoginPopUp extends React.Component {
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
      {this.state.seen ? <PopUpLogin toggle={this.togglePop} /> : null}
      {this.state.seen ? null : <div className="login-btn" onClick={this.togglePop}><button className="loginButton">Sign In</button></div>}
      </div>
    );
  }
}

// Inner model class component
class PopUpLogin extends Component {
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
          <LoginBox handler={this.handler}/>
          <div className="modal_error_message">
          <p>{this.state.error_msg}</p>
          </div>
        </div>
      </div>
    );
  }
}

// Login function rendering all controls and processing everything
function LoginBox( { handler } ) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
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
          handler(error.response.data.detail);
        });
    }
  };

  return (
    <>
      {fetchToken() ? (
        navigate("/profile")
      ) : (
        <form>
          <label style={{ marginRight: 10 }}>Username: </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <br></br>
          <label style={{ marginRight: 10 }}>Password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button type="button" onClick={login} className="loginButton">
            Login
          </button>
          <br></br>
        </form>
      )}
    </>
  );
}
