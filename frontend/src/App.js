import './App.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'; 
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '', password: '' });

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setAuthenticated(true);
            setUser(user);
        }
    }, []);

    const handleLogin = (firstname, lastname, email, password) => {
        setAuthenticated(true);
        const user = { firstname, lastname, email, password };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const handleLogout = () => {
        toast.success('Logout Successful');
        localStorage.removeItem("user");
        setAuthenticated(false);
        setUser({ firstname: '', lastname: '', email: '', password: '' });
    };

    return (
        <div className="App">
            <Router>
                <div>
                    <ToastContainer className="toaster" theme='dark' position="top-center" autoClose={2000}/>
                    <Header authenticated={authenticated} handleLogout={handleLogout}/>
                    <Routes>
                        <Route path="/" element={<Home authenticated={authenticated} user={user}/>}/>
                        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                        <Route path="/register" element={<Register handleLogin={handleLogin}/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
