import React, { Component } from "react";
import "../css/summary.css";
import axios from "axios";
import { fetchToken } from "./Auth.js";

class SummaryTab extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
    this.getCategorySummary();
  }

  getCategorySummary = () => {
    var self = this;
    var login_token = fetchToken();
    let json_axios = axios.create({
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${login_token}`,
      },
    });
    json_axios
      .post("http://127.0.0.1:8045/get_categories_summary/")
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
          <label htmlFor="summaryDate"></label>
          <input type="month" id="summaryDate" value="2023-02" readOnly></input>
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
