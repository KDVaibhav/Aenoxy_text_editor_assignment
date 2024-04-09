import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async () => {        
        const data = {
            identifier,
            password
        }
        try { 
            
            const response = await axios.post("http://localhost:3000/api/Login", data)
            console.log('Login Successful')
            localStorage.setItem("token", response.data.token);
            navigate('/textEditor')

        } catch(error:any) {
            console.error('Login error', error.response.data);
            setError(error.response.data.message);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            {error &&<div>{error}</div>}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
            }}>
                <input type="text"placeholder="Enter Username Or Email" value={identifier} onChange={(e)=>setIdentifier(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button> 
                <Link to="/signUp">Sign Up</Link>
            </form>
        </div>
    );
};


export default Login;