import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleFormSubmit = async () => {
        try {
            const data = {
                username,
                email,
                password
            }
            const response = await axios.post("http://localhost:3000/api/SignUp", data);
            console.log("User Created Successfully")
            localStorage.setItem("token", response.data.token);
            navigate('/textEditor')
            
        } catch (error:any) {
            console.log(error.response.data);
            setError(error.response.data.message);
        }
    }
    
    return (
      <div>
        <h1>Sign Up</h1>
        {error && <div>{error}</div>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          <p>Already have an account?</p>
          <Link to="/">Login</Link>
        </form>
      </div>
    );
}

export default SignUp;