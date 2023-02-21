import axios from "axios";
import { fetchToken } from "./Auth.js";

export function updateExpense({
  stateChanger,
  uuid,
  date,
  name,
  amount,
  baseCcy,
  exchangeRate,
}) {
  if (window.confirm("Are you sure you want to update this expense?")) {
    var login_token = fetchToken();
    let json_axios = axios.create({
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${login_token}`,
      },
    });
    json_axios
      .post("http://127.0.0.1:8045/update_expense/", {
        uuid: uuid,
        date: date,
        name: name,
        base_ccy: baseCcy,
        exchange_rate: exchangeRate,
        amount: amount,
      })
      .then(function (response) {
        const parsed_response = JSON.stringify(response.data);
        const json_response = JSON.parse(parsed_response);
        console.log(json_response);
        stateChanger();
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  } else {
    return;
  }
}

export function addExpense({
  stateChanger,
  uuid_budget,
  uuid_category,
  date,
  name,
  amount,
  baseCcy,
  exchangeRate,
}) {
  if (window.confirm("Are you sure you want to update this expense?")) {
    var login_token = fetchToken();
    let json_axios = axios.create({
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${login_token}`,
      },
    });
    json_axios
      .post("http://127.0.0.1:8045/add_new_expense/", {
        uuid_budget: uuid_budget,
        uuid_category: uuid_category,
        date: date,
        name: name,
        base_ccy: baseCcy,
        exchange_rate: exchangeRate,
        amount: amount,
      })
      .then(function (response) {
        const parsed_response = JSON.stringify(response.data);
        const json_response = JSON.parse(parsed_response);
        console.log(json_response);
        stateChanger();
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  } else {
    return;
  }
}

export function removeExpense({ stateChanger, uuid }) {
  if (window.confirm("Are you sure you want to delete this expense?")) {
    var login_token = fetchToken();
    let json_axios = axios.create({
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${login_token}`,
      },
    });
    json_axios
      .post("http://127.0.0.1:8045/delete_expense/", {
        uuid: uuid,
      })
      .then(function (response) {
        const parsed_response = JSON.stringify(response.data);
        const json_response = JSON.parse(parsed_response);
        console.log(json_response);
        stateChanger();
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  } else {
    return;
  }
}
