import React from 'react';
import { Link } from 'react-router-dom';

const PageOutros: React.FC = () => {
    return (
        <div className="sitemap">
            <br />
            <ul>
                <h3>Informações da conta</h3>
                <li>
                    <Link to="/login"><button>Login</button></Link>
                </li>
                <li>
                <Link to="/codigoacesso"><button>Alterar Codigo de Acesso</button></Link>
                </li>
                <li>
                    <Link to=""><button>Cadastrar Codigo de Acesso</button></Link>
                </li>
            </ul>
            <br />
            <h3>Aplicativo</h3>
            <ul>
                <h3>Informações da conta</h3>
                <li>
                    <Link to=""><button>App para Android</button></Link>
                </li>
         
                <li>
                    <Link to=""><button>Configurações</button></Link>
                </li>
            </ul>

        </div>
    );
};

export default PageOutros;
