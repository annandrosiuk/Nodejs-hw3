import React, { useState } from 'react';

import './PasswordUpdateForm.scss';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const UPDATEPASSWORD_API = `${API_URL}/api/user/updatePassword`;

export default function PasswordUpdateForm(props) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checkNewPassword, setCheckNewPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlertMessage, setShowAlertMessage] = useState(false);

    const updatePassword = async () => {
        await axios.put(UPDATEPASSWORD_API, {
            newPassword
        }, {
            headers: {
                'authorization': localStorage.getItem('jwt_token')
            }
        });
    }

    const checkUpdatePassword = (e) => {
        e.preventDefault();

        if (oldPassword !== props.password) {
            return handleAlert('Wrong old password!');
        }

        if (newPassword === oldPassword) {
            return handleAlert('The new password must be different!');
        }

        if (newPassword === checkNewPassword) {
            updatePassword();
            window.location.reload(false);
        } else {
            return handleAlert('New passwords does not match!');
        }
    }

    const handleAlert = (message) => {
        setAlertMessage(message);
        setShowAlertMessage(true);
    }

    const handleOldPasswordInput = (e) => {
        setOldPassword(e.target.value);
    }

    const handleNewPasswordInput = (e) => {
        setNewPassword(e.target.value);
    }

    const handleCheckNewPasswordInput = (e) => {
        setCheckNewPassword(e.target.value);
    }

    return (
        <div className="updateuser-wrapper">
            <form className={`updateuser ${props.className}`} onSubmit={checkUpdatePassword}>
                <h1 className="updateuser__title"> Password Update: </h1>

                {showAlertMessage && <div className='updateuser__alert'> {alertMessage} </div>}
                <div className="updateuser__info">
                    <label className="updateuser__label" htmlFor='oldPassword'> Old password: </label>
                    <input
                        className="updateuser__input"
                        type='password'
                        name='oldPassword'
                        value={oldPassword}
                        onChange={handleOldPasswordInput}
                        required
                    />
                </div>
                <div className="updateuser__info">
                    <label className="updateuser__label" htmlFor='newPassword'> New password: </label>
                    <input
                        className="updateuser__input"
                        type='password'
                        name='newPassword'
                        value={newPassword}
                        onChange={handleNewPasswordInput}
                        required
                    />
                </div>
                <div className="updateuser__info">
                    <label className="updateuser__label" htmlFor='checkNewPassword'> Repeat new password: </label>
                    <input
                        className="updateuser__input"
                        type='password'
                        name='checkNewPassword'
                        value={checkNewPassword}
                        onChange={handleCheckNewPasswordInput}
                        required
                    />
                </div>
                <button className="updateuser__button" type='submit'> Submit password update </button>

            </form>
        </div>
    );
}