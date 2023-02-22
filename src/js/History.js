import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchToken } from "./Auth.js";
import "../css/history.css";

export default function HistoryTab() {
  // Declare state variable for data
  const [userData, setUserData] = useState();

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
        setUserData(json_response[0]);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    })
    // The [] ensures data is fetched only once (not every page render)
  }, []);

  function HistoryTable() {
    // Ensuring userData is loaded (not null/undefined/etc.)
    if(userData) {
      // Using map() to create new array with desired data
      const historyData = userData.categories.map(category => {
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
      )
    }
  }

	return (
			<div>
				<h2> History </h2>
				<section className="datePicker">
					<label htmlFor="historyDate"></label>
					<input type="month" id="historyDate"></input>
				</section>
				<section className="historyTable">
              <HistoryTable />
				</section>
			</div>
  );
}
