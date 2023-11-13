import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { logoutUser } from '../actions/userActions';
import { faSignInAlt, faSignOutAlt, faUser, faPoll, faTrophy, faBars, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

interface NavItem {
    icon: any; // O tipo específico do ícone depende da biblioteca que você está usando
    to: string;
    text: string;
    visible: boolean;
}

const Navbar: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { isLoggedIn, userInfo } = userLogin;
    const dispatch: AppDispatch = useDispatch();
    const [visivel, setVisivel] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handleVisivelNav = () => {
        setVisivel(!visivel);
    };


    const navItems: NavItem[] = [
        { icon: faUser, to: '/meuperfil', text: `${userInfo?.nome}`, visible: isLoggedIn },
        { icon: faTrophy, to: '/regras', text: 'Regras', visible: true },
        { icon: faSignOutAlt, to: '', text: 'Sair', visible: isLoggedIn },
        { icon: faBars, to: '/outros', text: 'Menu', visible: isLoggedIn },
        { icon: faFileExcel, to: '/contest', text: 'Contest', visible: isLoggedIn },
        { icon: faTrophy, to: '/ranking', text: 'Ranking', visible: true },
        
       
        { icon: faSignInAlt, to: '/login', text: 'Login', visible: !isLoggedIn },
        { icon: faPoll, to: '/votar', text: `Urna Digital | ${userInfo?.votos}`, visible: isLoggedIn },
    ];

    return (
        <>

            <nav className='navBar' >
                {visivel ? <h1 className='arrou-chamativo' onClick={handleVisivelNav}><FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '24px' }} /></h1> : <h1 className='arrou-chamativo' onClick={handleVisivelNav}><FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '24px' }} /></h1>}
                <ul style={{ display: `${visivel ? 'block' : 'none'}` }} className="nav-list">
                    {navItems.slice(0, navItems.length).map((item) => item.visible && (
                        <li key={item.to} onClick={item.to === '' ? handleLogout : (visivel ? handleVisivelNav : undefined)}>
                            <FontAwesomeIcon icon={item.icon} style={{ fontSize: '30px' }} />
                            <Link to={item.to} className={item.visible ? 'nav-item-visible' : 'nav-item-hidden'}>
                                {item.text}
                            </Link>
                        </li>
                    ))}
              
                    
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
