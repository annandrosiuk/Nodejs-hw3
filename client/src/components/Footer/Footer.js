import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="block footer">
            <div className="block__wrapper">
                <div className="footer__rights">&copy; 2020 Ann Androsiuk, Inc. All Rights Reserved.</div>
                <a className="footer__link" target="_blank" href="https://github.com/annandrosiuk/Nodejs-hw3">GitHub</a>
            </div>
        </footer>
    );
}

export default Footer;