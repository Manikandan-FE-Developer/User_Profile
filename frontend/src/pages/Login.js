import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function logIn(e) {
        e.preventDefault();
    
        setMessage('Loading...');
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!email || !password) {
            setMessage('Please fill in all fields');
        } else if (!emailRegex.test(email)) {
            setMessage('Incorrect email format');
        } else if (password.length < 8) {
            setMessage('Password must contain at least 8 characters');
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                    email,
                    password
                });
    
                if (response.data.message === 'Login successful') {
                    toast.success('Login Successful');
                    handleLogin(response.data.firstname, response.data.lastname, response.data.email, response.data.password);
                    navigate('/', { state: { id: email } });
                } else if (response.data.message === 'User not found') {
                    setMessage('User has not signed up');
                } else {
                    setMessage('Email or password wrong');
                }
            } catch (error) {
                if (error.response.status === 401) {
                    setMessage('Email or password wrong');
                } else {
                    setMessage('Something went wrong');
                    console.error(error);
                }
            }
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    }    

    return (
        <div className="login-container">
            <form className="login" onSubmit={logIn}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <p className="error">{message}</p>
                <button type="submit" className="btn btn-primary">Login</button>
                <hr />
                <div className="link">
                    <Link to="/register">I don't have an account</Link>
                </div>
            </form>
        </div>
    );
}