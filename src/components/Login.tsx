import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { loginUser } from '../actions/userActions';
import { RootState } from '../reducers';
import { GiBroom } from 'react-icons/gi';
import { FaUser, FaSignInAlt, FaLock } from 'react-icons/fa';

const icons = [
    { id: 1, iconUrl: 'https://static.vecteezy.com/system/resources/previews/012/893/824/non_2x/elephant-large-transparent-background-free-png.png' },
    { id: 2, iconUrl: 'https://cdn.pixabay.com/photo/2016/07/04/09/05/pyramids-1496253_960_720.png' },
    { id: 3, iconUrl: 'https://www.urbs.curitiba.pr.gov.br/uploads/galeriaNoticaImagens/a3ae8215b0b2050aba367623ce9d3205ca7a512c.png' },
    { id: 4, iconUrl: 'https://images.vexels.com/media/users/3/160071/isolated/preview/8a4c9b162a4495af9185c91a57b6334f-cachorro-fofo-com-cauda-de-cachorro-e-lingua-achatada.png' },
    { id: 5, iconUrl: 'https://i.pinimg.com/originals/63/c2/85/63c285141e9a8f5cbc036b577f56a7dd.png' },
    { id: 6, iconUrl: 'https://static.wixstatic.com/media/6aef1d_b6dd7a4c993c46b89f5ecf23769bbbe5~mv2_d_1264_1332_s_2.png/v1/fill/w_949,h_1000,al_c,q_90,usm_0.66_1.00_0.01/6aef1d_b6dd7a4c993c46b89f5ecf23769bbbe5~mv2_d_1264_1332_s_2.png' },
    // Adicione mais ícones conforme necessário
];

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const characters = [0, 1, 2, 3, 4, 5];

    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleCharacterClick = (char: string) => {
        if (password.length < 6) {
            setPassword(password + char);
        }
    };

    const handlePasswordReset = () => {
        setPassword('');
    };

    const handleLogin = () => {
        if (password.length === 6) {
            dispatch(loginUser({ email, password }));
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div>
                <label htmlFor="email"></label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='Digite sua Matricula'
                    required
                />
                ,
            </div>
            <div className='icone-usuario'>
                <FaUser size={40} color='black' />
            </div>
            <div>
                <label htmlFor="password"></label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder='Codigo de Acesso'
                    readOnly
                    required
                />
                <div className='icone-senha'>
                    <FaLock size={40} color={`${password.length === 6 ? 'green' : 'black'}`} />
                </div>

                <button className='limpar-senha' onClick={handlePasswordReset}><GiBroom size={20} color="white" /></button>
                <p>A senha é composta por 6 combinações entre as 6 figuras.</p>
                <br />
                <div className="virtual-keyboard">
                    {characters.map((char, index) => (
                        <button
                            key={index}
                            onClick={() => handleCharacterClick(index.toString())}
                            disabled={password.length >= 6}
                        >

                            {icons[char] && <img src={icons[char].iconUrl} alt={`Icon ${char}`} />}
                        </button>
                    ))}
                </div>

            </div>
            <button onClick={handleLogin} disabled={password.length !== 6}>
                <FaSignInAlt size={48} color="green" />
                <p>Login</p>
            </button>

        </div>
    );
};

export default Login;
