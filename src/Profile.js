import {useNavigate} from "react-router-dom";
export default function Profile(){    
    const navigate = useNavigate();
    const signOut = () => {        localStorage.removeItem('login_token')
        navigate("/");
    }
    return(
        <>
        
            <div style = {{minHeight: 800, marginTop: 20 }}>
                <h1>Application</h1>                
                <p>This is main application page</p>                
                <div>
                    <button type = 'button' onClick= {signOut}>Sign Out</button>
                </div>
            </div>
            
        </>
    )
}