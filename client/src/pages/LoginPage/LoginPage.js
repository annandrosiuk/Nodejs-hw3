import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './LoginPage.scss';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const LOGIN_API = `${API_URL}/api/auth/login`;

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);

    const fetchLogin = async (e) => {
        e.preventDefault();
        const jwt_token = await axios.post(LOGIN_API, { login, password });
        localStorage.setItem('jwt_token', jwt_token.data);
        setRouteRedirect(true);
    }

    useEffect(() => {
        const jwt_token = localStorage.getItem('jwt_token');
        setRouteRedirect(!!jwt_token);
    }, []);

    const handleLoginInput = (e) => {
        setLogin(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    if (routeRedirect) {
        return <Redirect to='/' />
    }

    return (
        <div className="block signup login">
            <div className="block__wrapper">
                <h1 className="signup__title"> LOGIN: </h1>

                <form className="signup__form" onSubmit={fetchLogin}>
                    <div>
                        <label className="form__label" htmlFor='login'> Email or Username: </label>
                        <input
                            className="form__input"
                            type='text'
                            name='login'
                            value={login}
                            onChange={handleLoginInput}
                            required
                        />
                    </div>

                    <div>
                        <label className="form__label" htmlFor='password'> Password: </label>
                        <input
                            className="form__input"
                            type='password'
                            name='password'
                            value={password}
                            onChange={handlePasswordInput}
                            required
                        />
                    </div>

                    <Link className="form__label" to="/password-recovery"> forgot password? </Link>

                    <button className="form__button" type="submit"> Login </button><br />

                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__item"><Link to="/signup" className="nav__link">Sign up</Link></li>
                            <li className="nav__item"><Link to="/" className="nav__link">Home page</Link></li>
                        </ul>
                    </nav>
                </form>
            </div>
        </div>
    );
}