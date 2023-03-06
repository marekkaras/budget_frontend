import React, { Component } from "react";
import "../css/summary.css";
import axios from "axios";
import { fetchToken } from "./Auth.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

class SummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {categorySummary:[], budgetDate:0}
    this.getCategorySummary();
  }

  updateDate = (event) => {
    this.setState({budgetDate: event.target.value});
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
        self.setState({categorySummary: json_response});
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };
  
  // *-- Helper functions --*
  compareDates = (dateStringA, dateStringB) => {
    // Splitting date string for backwards compatibility
    const [year1, month1, date1] = dateStringA.split('-');
    const [year2, month2, date2] = dateStringB.split('-');

    // Javascript counts months 0 - 11 (hence month - 1)
    const dateA = new Date(year1, month1 - 1, date1);
    const dateB = new Date(year2, month2 - 1, date2);

    if (dateA.getTime() > dateB.getTime()) return -1;
    if (dateA.getTime() < dateB.getTime()) return 1;
    else return 0;
  }

  stringifyMonth = (year, month) => {
    const monthString = (month < 10)
      ? "0" + String(month)
      : String(month);
    return String(year) + "-" + monthString + "-01";
  }

  categoriesTable = () => {
    try {
        const categoryData = this.state.categorySummary[0].categories.map(category => {
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
    } catch (error) {
      if (error.message.includes("is undefined")) {
        return <h3>Add categories to see them here.</h3>
      } else {
        console.log(error);
      }
    } // end try-catch
  } // end function

  categoriesPieChart = () => {
    try {
      const labels = this.state.categorySummary[0].categories.map(category => {
        return category.category_name;
      });

      const data = this.state.categorySummary[0].categories.map(category => {
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
              "rgb(250, 250, 250)"
            ]
        }]
      };

      return (
        <Pie data={chartData} />
      );
    } catch (error) {
        if (error.message.includes("is undefined") === true){
          return;
        } else {
          console.log(error);
        }
    }
  }

  budgetPicker = () => {
    let budgetDates = this.state.categorySummary.map((budget, index) => {
      return ({
        "index": index,
        "id": budget.id,
        "year": budget.year,
        "month": budget.month 
      });
    })
    
    return (
      <>
        <label htmlFor="budgetSelect"></label>
        <select id="budgetSelect" value={this.state.budgetDate} onChange={this.updateDate}>
          {budgetDates.map(budget => {
            const dateString = this.stringifyMonth(budget.year, budget.month);
            return (
              <option key={budget.id} value={dateString}>{dateString}</option>
            );
          })}
        </select>
      </>
    )
  }

  render() {
    if (this.state.categorySummary) {
      if (this.state.categorySummary[0] === "No user budgets found") return (
        <div>
          <h2>Create a budget to get started</h2>
          <p>Hint: click the 'Manage' tab</p>
        </div>
      );
      else return (
        <div>
          <h2> Monthly Summary </h2>
          <div className="summary">
            <section className="datePicker">
              {this.budgetPicker()}
            </section>
            <section className="summaryPlot">
              <div className="plotImg">
                {/* Display plot of current budget situation */}
                {this.categoriesPieChart()}
              </div>
              <div className="categoriesTableDiv">
                {this.categoriesTable()}
              </div>
            </section>
          </div>
        </div>
      );
    } // end if (this.state.categorySummary)
  } // end render() 
} // end class

export default SummaryTab;
