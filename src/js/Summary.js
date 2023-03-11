import React, { Component } from "react";
import "../css/summary.css";
import axios from "axios";
import { fetchToken } from "./Auth.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

class SummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = { categorySummary: [], budgetDate: 0 };
    this.getCategorySummary();
  }

  updateDate = (event) => {
    this.setState({ budgetDate: event.target.value });
  };

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
        self.setState({ categorySummary: json_response });
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  // *-- Helper functions --*
  compareDates = (dateStringA, dateStringB) => {
    // Splitting date string for backwards compatibility
    const [year1, month1, date1] = dateStringA.split("-");
    const [year2, month2, date2] = dateStringB.split("-");

    // Javascript counts months 0 - 11 (hence month - 1)
    const dateA = new Date(year1, month1 - 1, date1);
    const dateB = new Date(year2, month2 - 1, date2);

    if (dateA.getTime() > dateB.getTime()) return -1;
    if (dateA.getTime() < dateB.getTime()) return 1;
    else return 0;
  };

  generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = (i * 360) / numColors;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  stringifyMonth = (year, month) => {
    const monthString = month < 10 ? "0" + String(month) : String(month);
    return String(year) + "-" + monthString + "-01";
  };

  categoriesTable = () => {
    try {
      const categoryData = this.state.categorySummary[this.state.budgetDate].categories.map(
        (category) => {
          const data = {
            id: category.id,
            name: category.category_name,
            spent: category.spent,
            remaining: category.remaining,
          };
          return data;
        }
      );

      return (
        <table id="categoriesTable" className="categoriesTable">
          <tbody>
            <tr>
              <th>Category</th>
              <th>Spent</th>
              <th>Remaining</th>
            </tr>
            {categoryData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.spent}</td>
                  <td>{item.remaining}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } catch (error) {
      if (error.message.includes("is undefined")) {
        return <h3>Add categories to see them here.</h3>;
      } else {
        console.log(error);
      }
    } // end try-catch
  }; // end function

  categoriesPieChart = () => {
    try {
      const labels = this.state.categorySummary[this.state.budgetDate].categories.map(
        (category) => {
          return category.category_name;
        }
      );

      const data = this.state.categorySummary[this.state.budgetDate].categories.map((category) => {
        return category.spent;
      });

      const numCategories = this.state.categorySummary[this.state.budgetDate].categories.length;
      const colors = generateColors(numCategories);

      const chartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
          },
        ],
      };

      return <Pie data={chartData} 
                  width={100}
                  height={50}/>;
    } catch (error) {
      if (error.message.includes("is undefined") === true) {
        return;
      } else {
        console.log(error);
      }
    }
  };

  budgetPicker = () => {
    let budgetDates = this.state.categorySummary.map((budget, index) => {
      return {
        index: index,
        id: budget.id,
        year: budget.year,
        month: budget.month,
      };
    });

    return (
      <>
        <label htmlFor="budgetSelect"></label>
        <select
          id="budgetSelect"
          value={this.state.budgetDate}
          onChange={this.updateDate}
          className="dropdownSelector"
        >
          {budgetDates.map((budget) => {
            const dateString = this.stringifyMonth(budget.year, budget.month);
            return (
              <option key={budget.id} value={budget.index}>
                {dateString}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  render() {
    if (this.state.categorySummary) {
      if (this.state.categorySummary[0] === "No user budgets found")
        return (
          <div>
            <h2>Create a budget to get started</h2>
            <p>Hint: click the 'Manage' tab</p>
          </div>
        );
      else
        return (
          <div>
            <h2> Monthly Summary </h2>
            <div className="summary">
              <section className="datePicker">{this.budgetPicker()}</section>
              <div className="categoriesTableDiv">
                  {this.categoriesTable()}
                </div>
              <section className="summaryPlotWrapper">
              <section className="summaryPlot">
                <div className="plotImg">
                  {/* Display plot of current budget situation */}
                  {this.categoriesPieChart()}
                </div>
              </section>
              </section>
            </div>
          </div>
        );
    } // end if (this.state.categorySummary)
  } // end render()
} // end class

export default SummaryTab;

function generateColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}
