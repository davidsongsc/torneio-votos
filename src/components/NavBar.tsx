import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
                // Logout imediato em caso de Sair
                handleLogout();
            } else {
                // Adiciona um atraso de 1000 milissegundos antes de redirecionar para o link
                timeoutId = setTimeout(() => {
                    navigate(to); // ou use o React Router como Link
                    timeoutId = null;
                    navigationAction = null;
                    handleVisivelNav();
                }, 700);

                // Armazena a ação de navegação atual
                navigationAction = () => {
                    navigate(to);
                    clearPendingActions();
                    handleVisivelNav();
                };
            }
        }





    };

    // Use esta função para cancelar todas as ações pendentes, se necessário
    const cancelPendingActions = () => {
        if (timeoutId) {
            clearPendingActions();
        }
        else {
            timeoutId = setTimeout(() => {
                handleVisivelNav();
            }, 800);
        }

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
                    <div>
                        <h1 className='arrou-chamativo arrou-bg' onClick={handleVisivelNav}><FontAwesomeIcon icon={faBars} style={{ fontSize: '43px' }} /></h1>
                    </div>
                    :
                    <div>
                        <h1 className='arrou-chamativo' onClick={cancelPendingActions}><FontAwesomeIcon icon={faBars} style={{ fontSize: '40px' }} /></h1>
                    </div>}
            </nav>
        </>
    );
};

export default Navbar;
