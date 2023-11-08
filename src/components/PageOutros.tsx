import React from 'react';
import { Link } from 'react-router-dom';

const PageOutros: React.FC = () => {
    return (
        <div className="sitemap">
            <h2>Torneio dos Votos</h2>
            <br />
            <ul>
                <h3>Conta</h3>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <a href="#fotoperfil">Cadastro</a>
                </li>
                <li>
                    <a href="#participantes">Trocar ID acesso</a>
                </li>
                <li>
                    <Link to="/meuperfil">Meu Perfil</Link>
                </li>
            </ul>
            <br />


        </div>
    );
};

export default PageOutros;
