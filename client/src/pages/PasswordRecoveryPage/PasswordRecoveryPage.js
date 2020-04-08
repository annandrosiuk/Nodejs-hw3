import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const CHECKUSER_API = `${API_URL}/api/auth/recoverPasswordCheckUser`;
const RECOVERPASSWORD_API = `${API_URL}/api/auth/recoverPassword`;

export default function PasswordRecoveryPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checkNewPassword, setCheckNewPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('smth');
    const [showAlertMessage, setShowAlertMessage] = useState(false);
    const [routeRedirect, setRouteRedirect] = useState(false);

    const recoverPassword = async (userId) => {
        await axios.put(RECOVERPASSWORD_API, {
            userId,
            newPassword
        });
    }

    const checkUser = async () => {
        const user = await axios.post(CHECKUSER_API, {
            username,
            email,
            firstName,
            lastName,
            mobileNumber
        });

        return user.data
    }

    const checkRecoverPassword = async (e) => {
        e.preventDefault();

        const userChecked = await checkUser();

        if (userChecked) {
            if (newPassword === userChecked.password) {
                return handleAlert('The new password must be different from the previous one!');
            }

            if (newPassword === checkNewPassword) {
                recoverPassword(userChecked._id);
                alert('Password has been changed');
                setRouteRedirect(true);
            } else {
                return handleAlert('Passwords does not match!');
            }
        } else {
            return handleAlert('Such user not found, please check filled information!');
        }
    }

    const handleAlert = (message) => {
        setAlertMessage(message);
        setShowAlertMessage(true);
    }

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handleFirstNameInput = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameInput = (e) => {
        setLastName(e.target.value);
    }

    const handleMobileNumberInput = (e) => {
        setMobileNumber(e.target.value);
    }

    const handleNewPasswordInput = (e) => {
        setNewPassword(e.target.value);
    }

    const handleCheckNewPasswordInput = (e) => {
        setCheckNewPassword(e.target.value);
    }

    if (routeRedirect) {
        return <Redirect to='/' />
    }

    return (
        <div className="block ">
            <div className="block__wrapper">
                <form className='recoverypassword' onSubmit={checkRecoverPassword}>
                    <h1 className="signup__title"> Password Recovery: </h1>

                    <p> To change password please enter your info and new password </p>

                    {showAlertMessage && <p className='recoverypassword__alert'> {alertMessage} </p>}

                    <label className="signup__label" htmlFor='username'> Username: </label>
                    <input
                        className="signup__input"
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleUsernameInput}
                        required
                    />
                    <hr />

                    <label className="signup__label" htmlFor='email'> Email: </label>
                    <input
                        className="signup__input"
                        type='text'
                        name='email'
                        value={email}
                        onChange={handleEmailInput}
                        required
                    />
                    <hr />

                    <label className="signup__label" htmlFor='firstName'> First Name: </label>
                    <input
                        className="signup__input"
                        type='text'
                        name='firstName'
                        value={firstName}
                        onChange={handleFirstNameInput}
                        required
                    />
                    <hr />

                    <label className="signup__label" htmlFor='lastName'> Last Name: </label>
                    <input
                        className="signup__input"
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={handleLastNameInput}
                        required
                    />
                    <hr />

                    <label className="signup__label" htmlFor='mobileNumber'> Mobile Number: </label>
                    <input
                        className="signup__input"
                        type='text'
                        name='mobileNumber'
                        value={mobileNumber}
                        onChange={handleMobileNumberInput}
                        required
                    />
                    <hr />

                    <label className="signup__label" htmlFor='newPassword'> New password: </label>
                    <input
                        className="signup__input"
                        type='password'
                        name='newPassword'
                        value={newPassword}
                        onChange={handleNewPasswordInput}
                        required
                    />
                    <hr />

                    <label className="signup__label" htmlFor='checkNewPassword'> Repeat new password: </label>
                    <input
                        className="signup__input"
                        type='password'
                        name='checkNewPassword'
                        value={checkNewPassword}
                        onChange={handleCheckNewPasswordInput}
                        required
                    />
                    <hr />

                    <button className="signup__button" type='submit'> Submit password recovery </button>

                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
                            <li className="nav__item"><Link to="/signup" className="nav__link">Sign up</Link></li>
                            <li className="nav__item"><Link to="/" className="nav__link">Home page</Link></li>
                        </ul>
                    </nav>
                </form>
            </div>
        </div>
    );
}