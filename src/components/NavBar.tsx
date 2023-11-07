import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavUl = {
    backgroundColor: '#404040',
    color: '#bfbfbf',
    padding: '10px',
    border: '1px solid #bfbfbf',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    cursor: 'pointer',
};

const NavUlLi = {
    padding: '0 10px',
}

const NavLink = {
    color: '#eaeaea',
    textDecoration: 'none',
    padding: '5px'
};
const Navbar: React.FC = () => {
    return (
        <nav style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '999' }}>
            <ul style={NavUl}>
                <li style={NavUlLi}>
                    <Link style={NavLink} to="/">Inicio</Link>
                </li>
                <li style={NavUlLi}>
                    <Link style={NavLink} to="/ranking">Ranking</Link>
                </li>
                <li style={NavUlLi}>
                    <Link style={NavLink} to="/perfil">Perfil</Link>
                </li>
                <li style={NavUlLi}>
                    <Link style={NavLink} to="/outros">Outros</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
