import {useState} from 'react';
import {setToken, fetchToken} from './Auth.js';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export default function Login(){    
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goToCreate = () =>{
        navigate("/create");
    };
    const login = () =>{        
        if(username === '' && password === ''){            
        return } else { 
        let urlencoded_axios = axios.create({headers: 
            { 'content-type': 'application/x-www-form-urlencoded' }})
        urlencoded_axios.post('http://127.0.0.1:8045/token', {
                username: username,
                password: password})
        .then(function (response) {if(response.data.access_token){
            setToken(response.data.access_token)
            navigate("/profile");
            }
        }).catch(function (error) {
        console.log(error, 'error');            
        });}
    };    
    return(
    <>
        <div style = {{minHeight: 800, marginTop: 20 }}>
            <h1>Budget App</h1>                <div style = {{marginTop: 50 }} >
                {
                    fetchToken() 
                    ? (
                        navigate("/profile")
                    ) 
                    : (
                    <form>
                    <label style = {{marginRight: 10 }}>Username: </label>
                    <input type = 'text'  onChange={ (e)=> setUsername(e.target.value)} />
                    <br></br>
                    <label style = {{marginRight: 10 }}>Password: </label>
                    <input type = 'text'  onChange={ (e)=> setPassword(e.target.value)} />
                    <br></br>
                    <button type = 'button' onClick = {login}>Login</button>
                    <br></br>
                    <button type = 'button' onClick = {goToCreate}>Create Account</button>
                    </form>
                    )
                }
                               </div>            </div>
        
    </>
    )
}