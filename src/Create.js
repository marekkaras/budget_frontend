import {useState} from 'react';
import {setToken, fetchToken} from './Auth.js';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export default function CreateAccount(){    
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const createUser = () =>{
        if(username === '' && password === '' && full_name === '' && email === ''){            
        return } else { 
        let json_axios = axios.create({headers: 
            { 'content-type': 'application/json' }})
        json_axios.post('http://127.0.0.1:8045/create_user/', {
                username: username,
                password: password,
                email: email,
                full_name: full_name})
        .then(function (response) {if(response.data.access_token){
            setToken(response.data.access_token)
            navigate("/profile");
            }
        }).catch(function (error) {
        console.log(error, 'error');            
        });}
    }
    const goBackToLogin = () =>{        
        navigate("/");
    }
    return(
    <>
        <div style = {{minHeight: 800, marginTop: 20 }}>
            <h1>Budget App</h1>                
            <div style = {{marginTop: 50 }} >
                {
                    fetchToken() 
                    ? (
                        <p>You are logged in!</p>
                    ) 
                    : (
                    <form>
                    <label style = {{marginRight: 10 }}>Username: </label>
                    <input type = 'text'  onChange={ (e)=> setUsername(e.target.value)} />
                    <br></br>
                    <label style = {{marginRight: 10 }}>Password: </label>
                    <input type = 'text'  onChange={ (e)=> setPassword(e.target.value)} />
                    <br></br>
                    <label style = {{marginRight: 10 }}>Email: </label>
                    <input type = 'text'  onChange={ (e)=> setEmail(e.target.value)} />
                    <br></br>
                    <label style = {{marginRight: 10 }}>Full Name: </label>
                    <input type = 'text'  onChange={ (e)=> setFullName(e.target.value)} />
                    <br></br>
                    <button type = 'button' onClick = {createUser}>Create User</button>
                    <br></br>
                    <button type = 'button' onClick = {goBackToLogin}>Go Back</button>
                    </form>
                    )
                }
            </div>
        </div>   
    </>
    )}