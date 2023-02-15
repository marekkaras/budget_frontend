import React, { Component } from "react";
import "../css/summary.css";

class SummaryTab extends Component {
	constructor() {
		super();
		this.state = {
			name: "React",
		};
	}
	render() {
		return (
			<div>
				{/* <p>This is summary component</p> */}
				<Summary />
			</div>
		);
	}
}

export default SummaryTab;

function Summary() {
	return (
		<>
			<h2> Monthly Summary </h2>
			<div className="summary">
				<section className="datePicker">
					<label htmlFor="summaryDate">Month</label>
					<input type="month" id="summaryDate" value="2023-02"></input>
				</section>

				<section className="summaryPlot">
					<div className="plotImg">
						{/* Display plot of current budget situation */}
						<img src={require("../img/pie.jpg")} alt="Budget pie chart"></img>
					</div>

					<div className="categoriesTableDiv">
						<table className="categoriesTable">
							<tbody>
								<tr>
									<th>Category</th>
									<th>Spent</th>
									<th>Remaining</th>
								</tr>
								{/* TODO: iterate through table in database + display here */}
								<tr>
									<td>Housing</td>
									<td>$100</td>
									<td>$150</td>
								</tr>
								<tr>
									<td>Internet</td>
									<td>$110</td>
									<td>$50</td>
								</tr>
								<tr>
									<td>Gas</td>
									<td>$50</td>
									<td>$0</td>
								</tr>
								<tr>
									<td>Food</td>
									<td>$300</td>
									<td>$250</td>
								</tr>
								<tr>
									<td>Vacation</td>
									<td>$0</td>
									<td>$900</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</>
	);
}
