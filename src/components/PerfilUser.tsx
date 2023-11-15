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
    const limite = 118;
    const imagens = [];

    for (let i = 63; i <= limite; i++) {
        imagens.push(`http://www.pinstar.com.br/imagens/pins/views/${i}.jpg`);
    }
    
    for (let x = 498; x <= 525; x++) {
        imagens.push(`http://www.pinstar.com.br/imagens/pins/views/${x}.jpg`);
    }
    for (let x = 441; x <= 455; x++) {
        imagens.push(`http://www.pinstar.com.br/imagens/pins/views/${x}.jpg`);
    }
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
                    {userInfo?.matricula === 970016 && <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', height: '300px',overflowY: 'auto', boxShadow: '1px 1px 1px white' }}>
                        {imagens.map((url, index) => (
                            <img key={index} src={url} alt={`Imagem ${index}`} width={'50px'} />
                        ))} </div>}

                </div>
            </div>
            <button onClick={handleLogout} style={{ display: `${!isLoggedIn ? 'none' : ''}` }}>Sair</button>
        </div>
    );
};

export default PerfilUser;
