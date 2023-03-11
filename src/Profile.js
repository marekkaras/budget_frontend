import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken } from "./js/Auth.js";
import axios from "axios";
import "./css/Profile.css";
import SummaryTab from "./js/Summary.js";
import HistoryTab from "./js/History.js";
import ManageTab from "./js/Manage.js";
import LogOutButton from "./js/LogOut.js";
import logo from "./img/logo.png";

// rendering user info class
class RenderProfile extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      full_name: "",
      budget_full_amount: 0,
      month: 0,
      year: 0,
      base_ccy: "",
      budget_uuid: "",
      disabled: 0,
      budget: JSON,
      summary_tab: true,
      history_tab: false,
      manage_tab: false,
    };
    this.getUserInfo();
    this.switchTab = this.switchTab.bind(this);
  }

  switchTab(name) {
    switch (name) {
      default:
        this.setState({ summary_tab: true });
        this.setState({ history_tab: false });
        this.setState({ manage_tab: false });
        break;
      case "summary":
        this.setState({ summary_tab: true });
        this.setState({ history_tab: false });
        this.setState({ manage_tab: false });
        break;
      case "history":
        this.setState({ summary_tab: false });
        this.setState({ history_tab: true });
        this.setState({ manage_tab: false });
        break;
      case "manage":
        this.setState({ summary_tab: false });
        this.setState({ history_tab: false });
        this.setState({ manage_tab: true });
        break;
    }
  }

  // get user info from the api
  getUserInfo = () => {
    // bind self to this so state can be returned
    // check if user data was already fetched to keep strain on api minimal
    var self = this;
    // get login token
    var login_token = fetchToken();
    // create headers and make an api call
    let urlencoded_axios = axios.create({
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${login_token}`,
      },
    });
    urlencoded_axios
      .get("http://127.0.0.1:8045/users/me")
      .then(function (response) {
        // parse response
        const parsed_response = JSON.stringify(response.data);
        const json_response = JSON.parse(parsed_response);
        self.setState({
          username: json_response["username"],
          email: json_response["email"],
          full_name: json_response["full_name"],
          disabled: json_response["disabled"],
        });
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  signOut = () => {
    const navigate = useNavigate();
    localStorage.removeItem("login_token");
    navigate("/");
  };

  // render element
  render() {
    return (
      <>
        <img src={logo} alt="Logo" width="600" height="150" />
        <div id="profile_wrapper">
          <div id="menu_div">

            <button
              value={this.state.summary_tab}
              className="menuButton"
              onClick={() => this.switchTab("summary")}
            >
              Summary
            </button>
            <button
              value={this.state.history_tab}
              className="menuButton"
              onClick={() => this.switchTab("history")}
            >
              History
            </button>
            <button
              value={this.state.manage_tab}
              className="menuButton"
              onClick={() => this.switchTab("manage")}
            >
              Manage
            </button>
            <LogOutButton />
            <p><b>
          You are logged in as {this.state.username} ({this.state.email}).
        </b>
        </p>
          </div>
          <div id="main_div">
            <div>
              {this.state.summary_tab && <SummaryTab />}
              {this.state.history_tab && <HistoryTab />}
              {this.state.manage_tab && <ManageTab />}
            </div>
          </div>
        </div>
      </>
    );
  }
}

// main profile rendering page
export default function Profile() {
  // consts

  return (
    <>
      <RenderProfile />
    </>
  );
}
