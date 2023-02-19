import axios from "axios";
import { fetchToken } from "./Auth.js";


export function updateCategory ( {cat_uuid, name, amount} ) {

    if (window.confirm('Are you sure you want to update this category?')) {
		var login_token = fetchToken();
		let json_axios = axios.create({
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${login_token}`,
			},
		});
		json_axios
			.post("http://127.0.0.1:8045/update_category_by_uuid/", {
        			uuid: cat_uuid,
        			category_name: name,
        			amount: amount})
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


export function removeCategory ( {cat_uuid} ) {

    if (window.confirm('Are you sure you want to delete this category?')) {
		var login_token = fetchToken();
		let json_axios = axios.create({
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${login_token}`,
			},
		});
		json_axios
			.post("http://127.0.0.1:8045/remove_category_by_uuid/", {
        			uuid: cat_uuid})
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