import React, { Component } from "react";
import "../css/summary.css";
import axios from "axios";
import { fetchToken } from "./Auth.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

class SummaryTab extends Component {
  constructor() {
    super();
    this.state = this.getCategorySummary();
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
        console.log("User data successfully loaded: ", json_response);
        self.setState(json_response[0]);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  categoriesTable = () => {
    // Ensuring userData has been loaded (not null, undefined, etc.)
    if (this.state) {
      const categoryData = this.state.categories.map(category => {
        const data = {
          "id": category.id,
          "name": category.category_name,
          "spent": category.spent,
          "remaining": category.remaining
        }
        return data;
      });

      return (
        <table id="categoriesTable">
          <tbody>
            <tr>
								<th>Category</th>
								<th>Spent</th>
								<th>Remaining</th>
            </tr>
            { categoryData.map(item => {
              return(
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.spent}</td>
                  <td>{item.remaining}</td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      );
    } // fi
  } 

  categoriesPieChart = () => {
    if (this.state) {
      const labels = this.state.categories.map(category => {
        return category.category_name;
      });

      const data = this.state.categories.map(category => {
        return category.spent;
      });

      const chartData = {
        labels: labels,
        datasets: [{
            data: data,
            // TODO: add logic for color palette (what is the max # of categories?)
            backgroundColor: [
              "rgb(25, 25, 25)",
              // "rgb(50, 50, 50)",
              "rgb(75, 75, 75)",
              // "rgb(100, 100, 100)",
              "rgb(125, 125, 125)",
              // "rgb(150, 150, 150)",
              // "rgb(175, 175, 175)",
              "rgb(200, 200, 200)",
              // "rgb(225, 225, 225)",
              // "rgb(250, 250, 250)"
            ]
        }]
      };

      return (
        <Pie data={chartData} />
      )
    }
  }

  render() {
    return (
      <div>
        {/* <p>This is summary component</p> */}
        <h2> Monthly Summary </h2>
      <div className="summary">
        <section className="datePicker">
          <label htmlFor="summaryDate"></label>
          <input type="month" id="summaryDate" value="2023-02" readOnly></input>
        </section>
        <section className="summaryPlot">
          <div className="plotImg">
            {/* Display plot of current budget situation */}
            {/* <img src={require("../img/pie.jpg")} alt="Budget pie chart"></img> */}
            {this.categoriesPieChart()}
          </div>
          <div className="categoriesTableDiv">
            {this.categoriesTable()}
          </div>
        </section>
      </div>
      </div>
    );
  }
}

export default SummaryTab;
