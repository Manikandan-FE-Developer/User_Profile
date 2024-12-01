import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

export default function Home({ authenticated, user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || 'images/logo.png');
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormValues({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                password: user.password || '',
            });
        }
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCameraClick = () => {
        document.getElementById("file-input").click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                setProfilePic(event.target.result);
                localStorage.setItem('profilePic', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateClick = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateUser`, formValues);

            if (response.data.message === 'User updated successfully') {
                const updatedUser = response.data.updatedUser;

                // Update local storage
                localStorage.setItem('user', JSON.stringify(updatedUser));
                localStorage.setItem('profilePic', profilePic);

                // Update formValues and user state
                setFormValues({
                    firstname: updatedUser.firstname,
                    lastname: updatedUser.lastname,
                    email: updatedUser.email,
                    password: updatedUser.password,
                });
                setIsEditing(false);

                toast('User details updated successfully');
            } else {
                setMessage('Failed to update user details');
            }
        } catch (error) {
            setMessage('Something went wrong');
            console.error('Error:', error);
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return authenticated ? (
        <div className="profile-container">
            <form className='profile'>
                <h2>Profile</h2>
                <i className="fa fa-pen-to-square editIcon" onClick={handleEditClick}></i>
                <div className="profile-pic-container">
                    <img src={profilePic} alt="Profile Pic" className="profile-pic" /><br/>
                    <i className="fa fa-camera" onClick={handleCameraClick}></i>
                    <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} /><br/>
                    {isEditing ? (
                        <div className='form-group'>
                            <input
                                type="text"
                                name="firstname"
                                value={formValues.firstname}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="First Name"
                            /><br/>
                            <input
                                type="text"
                                name="lastname"
                                value={formValues.lastname}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Last Name"
                            /><br/>
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Email"
                            /><br/>
                            <input
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Password"
                            /><br/>
                            <button type="button" onClick={handleUpdateClick} className="btn btn-primary">Update</button>
                        </div>
                    ) : (
                        <div className='userDetails'>
                            <div className='flex'>
                                <label>First Name:</label><p className='name'>{formValues.firstname}</p>
                            </div><hr/>
                            <div className='flex'>
                                <label>Last Name:</label><p className='name'>{formValues.lastname}</p>
                            </div><hr/>
                            <div className='flex'>
                                <label>Email:</label><p className='name'>{formValues.email}</p>
                            </div><hr/>
                            <div className='flex'>
                                <label>Password:</label><p className='name'>********</p>
                            </div><hr/>
                        </div>
                    )}
                </div>
                <p className="error">{message}</p>
            </form>
        </div>
    ) : (
        <div>
            <div className="welcome-container">
                <h1>Welcome to Our Website</h1>
                <p>Please log in or register to access your profile and other features.</p>
            </div>
        </div>
    );
}