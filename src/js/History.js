import React, { Component } from "react";
import axios from "axios";
import { fetchToken } from "./Auth.js";
import "../css/history.css";

class HistoryTab extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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
				console.log(json_response);
				self.setState({ budget_info: json_response });
			})
			.catch(function (error) {
				console.log(error, "error");
			});
	};

	render() {
		return (
			<div>
				<h2> History </h2>
				<History />
			</div>
		);
	}
}

export default HistoryTab;

function History() {
	return (
		<>
			<div className="history">
				<section className="datePicker">
					<label htmlFor="historyDate"></label>
					{/* TODO: customize datepicker as per survey results */}
					<input type="month" id="historyDate" value="2023-02" readOnly></input>
				</section>
				<section className="historyTable">
					<table>
						<tbody>
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Category</th>
								<th>Notes</th>
							</tr>
							{/* TODO: iterate through table in database + display here */}
							<tr>
								<td>06/02/2023</td>
								<td>$0.25</td>
								<td>Luxuries</td>
								<td>For good luck!For good luck!</td>
							</tr>
							<tr>
								<td>06/02/2023</td>
								<td>$0.25</td>
								<td>Luxuries</td>
								<td>For good luck!For good luck!</td>
							</tr>
							<tr>
								<td>06/02/2023</td>
								<td>$0.25</td>
								<td>Luxuries</td>
								<td>For good luck!For good luck!</td>
							</tr>
							<tr>
								<td>06/02/2023</td>
								<td>$0.25</td>
								<td>Luxuries</td>
								<td>For good luck!For good luck!</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
		</>
	);
}
