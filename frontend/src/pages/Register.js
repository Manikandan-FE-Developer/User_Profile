import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register({ handleLogin }) {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const history = useNavigate();

    async function submit(e) {
        e.preventDefault();
    
        setMessage("Loading...");
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!firstname || !lastname || !email || !password || !confirm) {
            setMessage("Please fill in all fields");
        } else if (!emailRegex.test(email)) {
            setMessage("Incorrect email format");
        } else if (password.length < 8) {
            setMessage('Password must contain at least 8 characters');
        } else if (password !== confirm) {
            setMessage("Passwords do not match");
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                    firstname,
                    lastname,
                    email,
                    password
                });
    
                if (response.data.message === "User already exists") {
                    setMessage("User already exists");
                } else if (response.data.message === "User registered successfully") {
                    toast.success("Registration Successful");
                    handleLogin(response.data.firstname, response.data.lastname, response.data.email, response.data.password);
                    history("/", { state: { id: email } });
                }
            } catch (error) {
                if (error.response.status === 409) {
                    setMessage('Email address is already in use');
                } else {
                    setMessage('Something went wrong');
                    console.error(error);
                }
            }
        }
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    return (
        <div className="register-container">
            <form className="register" onSubmit={submit}>
                <h2>Register</h2>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="First name"
                    value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last name"
                    value={lastname} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm Password"
                    value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="error">{message}</p>
                <hr />
                <div className="link">
                    <Link to="/login">Already I'm a user</Link>
                </div>
            </form>
        </div>        
    );
}