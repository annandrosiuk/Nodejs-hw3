import React, { useState } from 'react';
import './UserUpdateForm.scss';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const UPDATEUSER_API = `${API_URL}/api/user/updateUser`;

export default function UserUpdateForm(props) {
    const user = props.user;

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [mobileNumber, setMobileNumber] = useState(user.mobileNumber);

    const updateUser = async (e) => {
        await axios.put(UPDATEUSER_API, {
            firstName, lastName, username, email, mobileNumber
        }, {
            headers: {
                'authorization': localStorage.getItem('jwt_token')
            }
        });
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

    return (
        <div className="updateuser-wrapper">
            <form className={`updateuser ${props.className}`} onSubmit={updateUser}>
                <h1 className="updateuser__title"> Update info: </h1>
                <div className="updateuser__group">
                    <div className="updateuser__info">
                        <label className="updateuser__label" htmlFor='firstName'> First Name: </label>
                        <input
                            className="updateuser__input"
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={handleFirstNameInput}
                            required
                        />
                    </div>
                    <div className="updateuser__info">
                        <label className="updateuser__label" htmlFor='lastName'> Last Name: </label>
                        <input
                            className="updateuser__input"
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={handleLastNameInput}
                            required
                        />
                    </div>

                    <div className="updateuser__info">
                        <label className="updateuser__label" htmlFor='email'> Email: </label>
                        <input
                            className="updateuser__input"
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleEmailInput}
                            required
                        />
                    </div>
                    <div className="updateuser__info">
                        <label className="updateuser__label" htmlFor='mobileNumber'> Mobile Number: </label>
                        <input
                            className="updateuser__input"
                            type='text'
                            name='mobileNumber'
                            value={mobileNumber}
                            onChange={handleMobileNumberInput}
                            required
                        />
                    </div>
                </div>
                <div className="updateuser__info">
                    <label className="updateuser__label" htmlFor='username'> Username: </label>
                    <input
                        className="updateuser__input"
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleUsernameInput}
                        required
                    />
                </div>
                <button className="updateuser__button" type='submit'> Submit update </button>

            </form>
        </div >

    );
}