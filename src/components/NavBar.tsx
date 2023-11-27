import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { logoutUser } from '../actions/userActions';
import { faGavel, faHandPointUp, faSignInAlt, faSignOutAlt, faUser, faPoll, faTrophy, faBars, faVoteYea } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavItem {
    icon: any;
    to: string;
    text: string;
    visible: boolean;
}

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { isLoggedIn, userInfo } = userLogin;
    const dispatch: AppDispatch = useDispatch();
    const [visivel, setVisivel] = useState(false);
    let timeoutId: NodeJS.Timeout | null = null;
    let navigationAction: (() => void) | null = null;

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handleVisivelNav = () => {
        setVisivel(!visivel);
    };
    const handleNavegar = (local: string) => {
        if (local !== 'voltar') {
            navigate(local);
        } else {
            const previousPath = location.state?.from || '/ranking';
            navigate(previousPath);
        }

    }
    const clearPendingActions = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }

        if (navigationAction) {
            navigationAction = null;
        }
    };

    const handleLinkClick = (to: string) => {
        if (timeoutId) {
            clearPendingActions();
        }
        else {
            if (to === '') {
                handleLogout();
            } else {
                timeoutId = setTimeout(() => {
                    navigate(to); // ou use o React Router como Link
                    timeoutId = null;
                    navigationAction = null;
                    handleVisivelNav();
                }, 700);

                navigationAction = () => {
                    navigate(to);
                    clearPendingActions();
                    handleVisivelNav();
                };
            }
        }
    };

    const cancelPendingActions = () => {
        if (timeoutId) {
            clearPendingActions();
        }
        else {
            timeoutId = setTimeout(() => {
                handleVisivelNav();
            }, 100);
        }

    };

    const navItems: NavItem[] = [
        { icon: faSignOutAlt, to: '', text: 'Sair', visible: isLoggedIn },
        { icon: faUser, to: '/meuperfil', text: `${userInfo?.nome}`, visible: isLoggedIn },
        { icon: faGavel, to: '/regras', text: 'Regras', visible: true },
        { icon: faBars, to: '/outros', text: 'Ajustes', visible: isLoggedIn },
        { icon: faSignInAlt, to: '/login', text: 'Login', visible: !isLoggedIn },
        { icon: faSignOutAlt, to: '/codigoacesso', text: 'Codigo', visible: isLoggedIn },
    ];

    return (
        <>
            <nav className={`navBar ${visivel ? 'navBarAberta' : ''}`} >

                <ul style={{ display: `${visivel ? 'block' : 'none'}` }} className="nav-list">
                    {navItems.slice(0, navItems.length).map((item) => item.visible && (
                        <li key={item.to} onClick={() => handleLinkClick(item.to)}>
                            <FontAwesomeIcon icon={item.icon} style={{ fontSize: '30px' }} />
                            <span className={item.visible ? 'nav-item-visible' : 'nav-item-hidden'}>
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
                {visivel ?
                    <>

                    </>
                    :
                    <>

                        <div className='arrou-chamativo ' onClick={() => handleNavegar('voltar')}>
                            <h1 ><FontAwesomeIcon color={'gold'} icon={faTrophy} style={{ fontSize: '25px' }} /></h1>

                        </div>
                        <div className='arrou-chamativo ' onClick={() => handleNavegar('contest')}>
                            <h1 ><FontAwesomeIcon color={'gray'} icon={faHandPointUp} style={{ fontSize: '25px' }} /></h1>

                        </div>
                        <div className='arrou-chamativo ' onClick={() => handleNavegar('votar')} style={{ width: '60px', display: isLoggedIn ? 'flex' : 'none' }}>
                            <h1 ><FontAwesomeIcon icon={faVoteYea} style={{ fontSize: '25px' }} /> {`${userInfo?.votos}`}</h1>

                        </div>
                        <div className='arrou-chamativo ' onClick={cancelPendingActions}>
                            <h1 ><FontAwesomeIcon icon={faBars} style={{ fontSize: '25px' }} /></h1>

                        </div>
                    </>
                }
            </nav >
        </>
    );
};

export default Navbar;
