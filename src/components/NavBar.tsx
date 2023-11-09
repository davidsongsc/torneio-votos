import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { logoutUser } from '../actions/userActions';

const NavUl = {
    backgroundColor: 'cadetblue',
    color: '#bfbfbf',
    padding: '10px',
    border: '1px solid #bfbfbf',
    listStyle: 'none',
    display: 'flex',
    cursor: 'pointer',
    width: '99%',
    overflow: 'auto',
    height: '5vh',
    marginBottom: '8px',
    alignItems: 'center',
};

const NavUlLi = {
    padding: '0 5px',
    margin: '2px auto'
}

const NavLink = {
    color: '#eaeaea',
    textDecoration: 'none',
    padding: '10px',
    backgroundColor: '#202744',
    borderRadius: '8px',
    textShadow: '1px 1px 0px black',
    boxShadow: '1px 1px 0px black',
    borderStyle: 'groove',
    
};
const Navbar: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { isLoggedIn } = userLogin;
    const dispatch: AppDispatch = useDispatch(); // Use o tipo AppDispatch aqui


    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '999' }}>
            <ul style={NavUl}>
                {isLoggedIn ? <li style={NavUlLi}>
                    <Link style={NavLink} to="/votar">Votação</Link>
                </li> : ''}
                {isLoggedIn ? <li style={NavUlLi}>
                    <Link style={NavLink} to="/">Contest</Link>
                </li> : ''}

                <li style={NavUlLi}>
                    <Link style={NavLink} to="/ranking">Ranking</Link>
                </li>
                {isLoggedIn ? <li style={NavUlLi}>
                    <Link style={NavLink} to="/meuperfil">Perfil</Link>
                </li> : ''}

                <li style={NavUlLi}>
                    <Link style={NavLink} to="/outros">Menu</Link>
                </li>
                {isLoggedIn ? <li onClick={handleLogout} style={NavUlLi} >
                    <Link  style={NavLink} to="">Sair</Link>
                </li> : ''}
            </ul>
        </nav>
    );
};

export default Navbar;
