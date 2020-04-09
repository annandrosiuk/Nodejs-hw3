import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header block">
            <div className="block__wrapper">
                <h1><Link to="/" className="logo__link">UBER-LIKE</Link></h1>
            </div>
        </header>
    );
}
