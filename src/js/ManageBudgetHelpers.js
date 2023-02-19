import axios from "axios";
import { fetchToken } from "./Auth.js";


export function deleteBudget( selected ) {
    if (selected.selectedBudget === null || selected.selectedBudget === undefined) {
        return
    }
    if (selected.selectedBudget.value === null) {
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
        			uuid: selected.selectedBudget.value})
			.then(function (response) {
				const parsed_response = JSON.stringify(response.data);
				const json_response = JSON.parse(parsed_response);
				console.log(json_response);
			})
			.catch(function (error) {
				console.log(error, "error");
			});
    } else {
        return
    }
}