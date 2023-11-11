import React, { useEffect } from 'react';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { AppDispatch } from '../store'; // Substitua pelo caminho correto para a sua store

const PerfilUser: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { userInfo } = userLogin;
    const dispatch: AppDispatch = useDispatch(); // Use o tipo AppDispatch aqui
    const { isLoggedIn } = userLogin;
    useEffect(() => {
        // Rolando para o topo da página quando o componente é montado
        window.scrollTo(0, 0);
    }, []);
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    if (!userLogin) {
        return <div>Funcionário não encontrado</div>;
    }

    return (
        <div className='perfil-container'>
            <div>
                <br />
                <br />
                <div className='painel'></div>
                <img className='perfil-image' src={`https://dagesico.pythonanywhere.com/static/img/perfil.jpg`} alt={`${userInfo?.matricula}`} />
                <div className='info'>
                    <br />
                    <h3>{userInfo?.nome}</h3>
                    <br /><br />
                    <div>
                        <p> {userInfo?.alcunha}</p>
                        <p>Matricula: {userInfo?.matricula}</p>
                        <br />

                    </div>
                </div>
            </div>
            <button onClick={handleLogout} style={{ display: `${!isLoggedIn ? 'none' : ''}` }}>Sair</button>
        </div>
    );
};

export default PerfilUser;
