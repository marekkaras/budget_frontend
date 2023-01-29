import {useNavigate} from "react-router-dom";

export default function LogOutButton() {
    const navigate = useNavigate();
    const signOut = () => {        localStorage.removeItem('login_token')
        navigate("/");
    }
    
    return (
        <>
            <button type = 'button' onClick= {signOut}>Sign Out</button>
        </>
    )
}