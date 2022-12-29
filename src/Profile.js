import React from 'react';
import {useNavigate} from "react-router-dom";
import {fetchToken} from './Auth.js';
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
            disabled: 0
        };
        this.getUserInfo();
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
    
    // render element
    render() {
        return (
        <div>
        <p>Hello {this.state.full_name} [{this.state.username}, {this.state.email}]</p>   
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
                <h1>Application</h1>
                <RenderUserInfo/>                
                <p>This is main application page</p>                
                <div>
                    <button type = 'button' onClick= {signOut}>Sign Out</button>
                </div>
            </div>
            
        </>
    )
}