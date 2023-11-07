import React from 'react';

const PageOutros: React.FC = () => {
    return (
        <div className="sitemap">
            <h2>Torneio dos Votos</h2>
            <ul>
                <h3>Informações</h3>
                <li>
                    <a href="#historico">Historico de votos</a>
                </li>
                <li>
                    <a href="#fotoperfil">Foto no Perfil</a>
                </li>
                <li>
                    <a href="#participantes">Todos os participantes</a>
                </li>
                <li>
                    <a href="#acesso">Acesso</a>
                </li>
            </ul>
            <br />
            <ul>
                <h3>Conta</h3>
                <li>
                    <a href="#historico">Login</a>
                </li>
                <li>
                    <a href="#fotoperfil">Cadastro</a>
                </li>
                <li>
                    <a href="#participantes">Trocar ID acesso</a>
                </li>
            </ul>
            <br />
            <ul>
                <h3>Contest</h3>
                <li>
                    <a href="#historico">Cadastrar Contest</a>
                </li>
                <li>
                    <a href="#fotoperfil">Editar Contest</a>
                </li>
            </ul>
            <br />
            <ul>
                <h3>Urna Eletronica</h3>
                <li>
                    <a href="#historico">Calendario</a>
                </li>
                <li>
                    <a href="#fotoperfil">Votos Emitidos</a>
                </li>
            </ul>
        </div>
    );
};

export default PageOutros;
