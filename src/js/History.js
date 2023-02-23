import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchToken } from "./Auth.js";
import "../css/history.css";

export default function HistoryTab() {
  // Declare state variables
  const [userData, setUserData] = useState();
  const [budgetDate, setBudgetDate] = useState("2023-01-01");

  const updateDate = (event) => {
    setBudgetDate(event.target.value);
  }

  // Fetch data with useEffect hook + store in state variable
  useEffect(() => {
    setUserData(() => {
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
        console.log('User data successfully loaded: ', json_response);
        setUserData(json_response);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    })
    // The [] ensures data is fetched only once (not every page render)
  }, []);

  function compareDates(dateStringA, dateStringB) {
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

  function stringifyMonth(year, month) {
    const monthString = (month < 10)
      ? "0" + String(month)
      : String(month);
    return String(year) + "-" + monthString + "-01";
  }

  function HistoryTable() {
    // Ensuring userData is loaded (not null/undefined/etc.)
    if(userData) {
      // Ensuring budgetDate is loaded (not null/undefined/etc.)
      if (budgetDate) {
        const selectedBudget = userData.map((budget, index) => {
          const dateString = stringifyMonth(budget.year, budget.month);
          if (compareDates(dateString, budgetDate) === 0) {
            return index;
          }
        });

        // Extracting desired data from selected budget
        let historyData = userData[selectedBudget].categories.map(category => {
          return ( category.expenses.map(expense => {
            const data = {
              "id": expense.id,
              "name": expense.name,
              "date": expense.date,
              "category": category.category_name,
              "amount": expense.amount
            }
            return data;
          }) );
        });

        // Arranging table by date (newest -> oldest)
        historyData = historyData.flat().sort(
          (dataObjA, dataObjB) => { return compareDates(dataObjA.date, dataObjB.date); }
          );
  
        return (
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Notes</th>
              </tr>
              { historyData.flat().map(item => {
                return(
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                  </tr>
                );
              }) }
            </tbody>
          </table>
        ) //end return
      } //end if(budgetData)
    } //end if(userData)
  } //end function

  function BudgetPicker() {
    if (userData){
      let budgetDates = userData.map(budget => {
        return ({
          "id": budget.id,
          "year": budget.year,
          "month": budget.month 
        });
      })
    
      return (
        <>
          <label htmlFor="budgetSelect"></label>
          <select id="budgetSelect" value={budgetDate} onChange={updateDate}>
            {budgetDates.map(budget => {
              const dateString = stringifyMonth(budget.year, budget.month);
              return (
                <option key={budget.id} value={dateString}>{dateString}</option>
              );
            })}
          </select>
        </>
      )
    }
  }

	return (
			<div>
				<h2> History </h2>
				<section className="datePicker">
          <BudgetPicker />
				</section>
				<section className="historyTable">
          <HistoryTable />
				</section>
			</div>
  );
}
