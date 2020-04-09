import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './SignupPage.scss';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const SIGNUP_API = `${API_URL}/api/auth/signup`;

export default function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);

    const fetchSignup = async (e) => {
        e.preventDefault();
        await axios.post(SIGNUP_API, { firstName, lastName, username, email, mobileNumber, password, role });
        alert('Signed up successfully!');
        setRouteRedirect(true);
    }

    const handleFirstNameInput = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameInput = (e) => {
        setLastName(e.target.value);
    }

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handleMobileNumberInput = (e) => {
        setMobileNumber(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleRadioShipper = (e) => {
        setRole(e.target.value);
    }

    const handleRadioDriver = (e) => {
        setRole(e.target.value);
    }

    useEffect(() => {
        const jwt_token = localStorage.getItem('jwt_token');
        setRouteRedirect(!!jwt_token);
    }, []);

    if (routeRedirect) {
        return <Redirect to='/' />
    }

    return (
        <div className="block signup">
            <div className="block__wrapper">
                <h1 className="signup__title"> Sign Up: </h1>

                <form className="form" onSubmit={fetchSignup}>
                    <div className="form__group">
                        <input
                            className="form__input"
                            type='text'
                            name='firstName'
                            placeholder="First Name"
                            value={firstName}
                            onChange={handleFirstNameInput}
                            required
                        />
                        <input
                            className="form__input"
                            type='text'
                            name='lastName'
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleLastNameInput}
                            required
                        />
                        <input
                            className="form__input"
                            type='email'
                            name='email'
                            value={email}
                            placeholder="Email"
                            onChange={handleEmailInput}
                            required
                        />
                        <input
                            className="form__input"
                            type='text'
                            name='mobileNumber'
                            value={mobileNumber}
                            placeholder="Mobile Number"
                            onChange={handleMobileNumberInput}
                            required
                        />
                    </div>

                    <input
                        className="form__input"
                        type='text'
                        name='username'
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameInput}
                        required
                    />
                    <input
                        className="form__input"
                        type='password'
                        name='password'
                        value={password}
                        placeholder="Password"
                        onChange={handlePasswordInput}
                        required
                    />

                    <div className="form__wrapper">
                        <div className="form__label"> You are: </div>
                        <input
                            className="form__radio"
                            type='radio'
                            id='driver'
                            name='role'
                            value='driver'
                            onChange={handleRadioDriver}
                        />
                        <label className="form__label" htmlFor='driver'> Driver </label>

                        <input
                            className="form__radio"
                            type='radio'
                            id='shipper'
                            name='role'
                            value='shipper'
                            onChange={handleRadioShipper}
                        />
                        <label className="form__label" htmlFor='shipper'> Shipper </label>
                    </div>

                    <button className="form__button" type='submit'> Sign Up </button>

                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
                            <li className="nav__item"><Link to="/" className="nav__link">Home page</Link></li>
                        </ul>
                    </nav>
                </form>
            </div>

        </div>
    );
}