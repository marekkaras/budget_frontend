import axios from "axios";
import { fetchToken } from "./Auth.js";


export function deleteBudget( {stateChangerRemoveBudget, selectedBudget} ) {
    console.log(selectedBudget);
    if (selectedBudget === null || selectedBudget === undefined) {
        return
    }
    if (selectedBudget.value === null) {
        return
    }
    if (window.confirm('Are you sure you want to delete this budget?')) {
		var login_token = fetchToken();
		let json_axios = axios.create({
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${login_token}`,
			},
		});
		json_axios
			.post("http://127.0.0.1:8045/delete_budget_for_user/", {
        			uuid: selectedBudget.value})
			.then(function (response) {
				const parsed_response = JSON.stringify(response.data);
				const json_response = JSON.parse(parsed_response);
				console.log(json_response);
				stateChangerRemoveBudget();
			})
			.catch(function (error) {
				console.log(error, "error");
			});
    } else {
        return
    }
}


export function addBudget ( {stateChanger, amount, ccy, year, month} ) {
    year = parseInt(year);
    month = parseInt(month);

    if (window.confirm('Are you sure you want to add / update this budget?')) {
		var login_token = fetchToken();
		let json_axios = axios.create({
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${login_token}`,
			},
		});
		json_axios
			.post("http://127.0.0.1:8045/add_budget_for_user/", {
        			amount: amount,
        			base_ccy: ccy,
        			year: year,
        			month: month})
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
        return
    }
}