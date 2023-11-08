import React from 'react';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { AppDispatch } from '../store'; // Substitua pelo caminho correto para a sua store

const PerfilUser: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { userInfo } = userLogin;
    const dispatch: AppDispatch = useDispatch(); // Use o tipo AppDispatch aqui
    const { isLoggedIn } = userLogin;

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
                    <h3>{userInfo?.nome}</h3>
                    <div>

                        <p>Tag: {userInfo?.alcunha}</p>
                        <p>Matricula: {userInfo?.matricula}</p>
                    </div>
                </div>
            </div>
            <button onClick={handleLogout} style={{ display: `${!isLoggedIn ? 'none' : ''}` }}>Sair</button>
        </div>
    );
};

export default PerfilUser;
