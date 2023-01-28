import React from 'react';
import {useNavigate} from "react-router-dom";
import {fetchToken} from './js/Auth.js';
import axios from 'axios';

// rendering user info class
class RenderUserInfo extends React.Component {

    // constructor
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            full_name: '',
            budget_full_amount: 0,
            month: 0,
            year: 0,
            base_ccy: '',
            budget_uuid: '',
            disabled: 0,
            budget: JSON,
        };
        this.getUserInfo();
        this.getBugetsInfo();
    }

    // get user info from the api
    getUserInfo = () => {
        // bind self to this so state can be returned
        // check if user data was already fetched to keep strain on api minimal
        var self = this;
        // get login token
        var login_token = fetchToken();
        // create headers and make an api call
        let urlencoded_axios = axios.create({headers: 
            { 'content-type': 'application/x-www-form-urlencoded', 
            'Authorization': `Bearer ${login_token}` }})
        urlencoded_axios.get('http://127.0.0.1:8045/users/me')
        .then(function (response) {
            // parse response
            const parsed_response = JSON.stringify(response.data)
            const json_response = JSON.parse(parsed_response)
            self.setState({ username: json_response['username'],
                            email: json_response['email'],
                            full_name: json_response['full_name'],
                            disabled: json_response['disabled'] });
            }).catch(function (error) {
            console.log(error, 'error')        
            });}
            
    // Get budget info
    getBugetsInfo = () => {
        // bind self to this so state can be returned
        // check if user data was already fetched to keep strain on api minimal
        var self = this;
        // get login token
        var login_token = fetchToken();
        // create headers and make an api call
        let urlencoded_axios = axios.create({headers: 
            { 'content-type': 'application/json', 
            'Authorization': `Bearer ${login_token}` }})
        urlencoded_axios.post('http://127.0.0.1:8045/get_budget_summary/',
                                {uuid: "c89d4648-666d-4b6d-b9e0-6db67391e1ba"})
        .then(function (response) {
            // parse response
            const parsed_response = JSON.stringify(response.data)
            const json_response = JSON.parse(parsed_response)
            console.log(json_response);
            self.setState({ budget: json_response});
            console.log(self.state.budget)
            }).catch(function (error) {
            console.log(error, 'error')        
            });}
    
    // render element
    render() {
        return (
        <div>
        <p>Hello <b>{this.state.full_name}</b> [login: <b>{this.state.username}</b>, email: <b>{this.state.email}</b>]</p>
        <br></br>
        <button>Add Budget</button>
        <button>Update Budget</button>
        <button>Delete Budget</button>
        <br></br>
        <select name="cars" id="cars">
          <option value="volvo">January 2023</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <p><b>Your budget for January 2023 is {this.state.budget.amount} {this.state.budget.base_ccy}</b></p>
        <button>Add Category</button>
        <button>Remove Category</button>
        <p>Category name: <b>Fun</b>, allocated <b>500.00</b> in USD [remaning: <b>396.50</b> in USD]</p>
         <table class="center">
          <tr>
            <th>Date</th>
            <th>Expense</th>
            <th>Amount</th>
            <th>Exchange Rate</th>
            <th>Budget Amount</th>
          </tr>
          <tr>
            <td>2023-01-01</td>
            <td>Tacos</td>
            <td>50.00 USD</td>
            <td>1.00</td>
            <td>50.00 USD</td>
          </tr>
          <td>2023-01-01</td>
            <td>Tacos</td>
            <td>50.00 EUR</td>
            <td>1.07</td>
            <td>53.50 USD</td>
        </table>
        <button>Add Expense</button>
        <button>Update Expense</button>
        <button>Remove Expense</button>
        <br></br>
        <p>Category name: <b>Bills</b>, allocated <b>500.00</b> in USD [remaning: <b>419.00</b> in USD]</p>
         <table class="center">
          <tr>
            <th>Date</th>
            <th>Expense</th>
            <th>Amount</th>
            <th>Exchange Rate</th>
            <th>Budget Amount</th>
          </tr>
          <tr>
            <td>2023-01-02</td>
            <td>Gas</td>
            <td>75.00 CHF</td>
            <td>1.08</td>
            <td>81.00 USD</td>
          </tr>
        </table>
        <button>Add Expense</button>
        <button>Update Expense</button>
        <button>Remove Expense</button>
        <br></br>
        <br></br>
        </div>);
    }
}


// main profile rendering page
export default function Profile(){    
    // consts
    const navigate = useNavigate();
    const signOut = () => {        localStorage.removeItem('login_token')
        navigate("/");
    }
    
    return(
        <>
            <div style = {{minHeight: 800, marginTop: 20 }}>
                <h1>Budget 1.0</h1>
                <RenderUserInfo/>            
                <div>
                    <button type = 'button' onClick= {signOut}>Sign Out</button>
                </div>
            </div>
            
        </>
    )
}