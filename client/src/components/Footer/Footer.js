import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="block footer">
                <div className="block__wrapper">
                    <div className="footer__rights">&copy; 2020 Ann Androsiuk, Inc.
                All Rights Reserved.</div>

                    <a className="footer__link" href="https://github.com/annandrosiuk">GitHub</a>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default Footer;