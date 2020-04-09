import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './MainPage.scss';

export default function Header() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [routeRedirect, setRouteRedirect] = useState(false);

    useEffect(() => {
        const jwt_token = localStorage.getItem('jwt_token');
        setIsAuthorized(!!jwt_token);
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            setRouteRedirect(true);
        }
    }, [isAuthorized]);

    if (routeRedirect) {
        return <Redirect to='/user' />
    }

    return (
        <section className="main block">
            <div className="block__wrapper">
                <div className="main__info">
                    <h1 className="main__title">We make everything to make your life easier</h1>
                    <p className="main__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    {!isAuthorized && <>
                        <nav className="nav">
                            <ul className="nav__list">
                                <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
                                <li className="nav__item"><Link to="/signup" className="nav__link">Sign up</Link></li>
                            </ul>
                        </nav>
                    </>}
                </div>

                <div className="main__image"></div>
            </div>
        </section>
    );
}




// export default function MainPage() {
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [routeRedirect, setRouteRedirect] = useState(false);

//     useEffect(() => {
//         const jwt_token = localStorage.getItem('jwt_token');
//         setIsAuthorized(!!jwt_token);
//     }, []);

//     useEffect(() => {
//         if (isAuthorized) {
//             setRouteRedirect(true);
//         }
//     }, [isAuthorized]);

//     if (routeRedirect) {
//         return <Redirect to='/user' />
//     }

//     return (
//         <>
//             {!isAuthorized && <>
//                 <h2> Log In or Sign Up </h2>

//                 <div className='navigation-panel'>
//                     <Link to="/login"> login </Link>

//                     <Link to="/signup"> signup </Link>
//                 </div>
//             </>}
//         </>
//     );
// }