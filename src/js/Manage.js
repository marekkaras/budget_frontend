import React, { Component } from "react";
import "../css/test.css";
import axios from "axios";
import { fetchToken } from "./Auth.js";
import { Manager } from "./ManageBudgets.js";

class ManageTab extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true};
		this.getBudgetsInfo();
	}

	getBudgetsInfo = () => {
		var self = this;
		var login_token = fetchToken();
		let json_axios = axios.create({
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${login_token}`,
			},
		});
		json_axios
			.post("http://127.0.0.1:8045/get_user_history/")
			.then(function (response) {
				const parsed_response = JSON.stringify(response.data);
				const json_response = JSON.parse(parsed_response);
				self.setState({ budget_info: json_response });
				self.setState({ loading: false });
			})
			.catch(function (error) {
				console.log(error, "error");
			});
	};
	
	render() {
		return (
			<div>
				{this.state.loading ?
				<p>loading</p>
				:
				<Manager budget_info={this.state.budget_info}/>
				}
			</div>
		);
	}
}

export default ManageTab;
