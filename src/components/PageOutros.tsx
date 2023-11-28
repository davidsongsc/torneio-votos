import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const PageOutros: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        // Rolando para o topo da página quando o componente é montado
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sitemap">
            <br />
            <ul>

                {userInfo?.matricula === 970016 && (

                    <>
                        <h2>CONTEST MASTER</h2>
                        <li>
                            <a href="https://bz97.pythonanywhere.com/admin/">Banco de dados</a>
                        </li>
                        <li>
                            <a href="https://bz97.pythonanywhere.com/admin/controle/usuario/add/">Novo Usuario DB</a>
                        </li>
                        <li>
                            <a href="https://bz97.pythonanywhere.com/admin/">Novo Contest DB</a>
                        </li>
                        <li>
                            <a href="https://bz97.pythonanywhere.com/admin/controle/pagina/add/">Nova Pagina DB</a>
                        </li>
                        <li>
                            <a href="https://bz97.pythonanywhere.com/admin/controle/votos/">Votos DB</a>
                        </li>
                        <li>
                            <a href="https://bz97.pythonanywhere.com/admin/auth/user/add/">Liderança DB</a>
                        </li>
                        <li>
                            <a href="https://bz97.pythonanywhere.com/admin/auth/group/">DB Administrador</a>
                        </li>
                        <li>
                            <a href="https://clarity.microsoft.com/projects/view/jmmnp7hmna/dashboard?date=Last%203%20days">microsoft clarity</a>
                        </li>
                        <li>
                            <a href="https://analytics.google.com/analytics/web/#/p415534484/reports/home">google analytics </a>
                        </li>
                        <li>
                            <Link to="/novocontest">Novo Contest</Link>
                        </li>
                        <li>
                            <Link to="/">Pesquisar</Link>
                        </li>
                        <li>
                            <Link to="/controle">Controle Contest</Link>
                        </li>
                        <li>
                            <Link to="/torneio">Reiniciar Contest</Link>
                        </li>
                    </>
                )}

                {(userInfo?.alcunha && userInfo.alcunha.toLowerCase().includes('gerencia')) && (

                    <>
                        <h3>Contest</h3>
                        <li>
                            <Link to="/novocontest">Novo</Link>
                        </li>
                        <li>
                            <Link to="/">Pesquisar</Link>
                        </li>
                        <li>
                            <Link to="/controle">Controle</Link>
                        </li>
                        <li>
                            <Link to="/torneio">Reiniciar</Link>
                        </li>

                    </>
                )}
                <h3>Noticias</h3>
                <li>
                    <Link to="/">Novo Post</Link>
                </li>
                <li>
                    <Link to="/">Threads</Link>
                </li>
                <li>
                    <Link to="/">Pesquisar</Link>
                </li>
            </ul>

        </div>
    );
};

export default PageOutros;
