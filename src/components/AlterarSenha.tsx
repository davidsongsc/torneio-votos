import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { alteraLoginUser, loginUser } from '../actions/userActions';
import { RootState } from '../reducers';
import { GiBroom } from 'react-icons/gi';
import { FaUser, FaSignInAlt, FaLock, FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const icons = [
    { id: 1, iconUrl: 'https://static.vecteezy.com/system/resources/previews/012/893/824/non_2x/elephant-large-transparent-background-free-png.png' },
    { id: 2, iconUrl: 'https://cdn.pixabay.com/photo/2016/07/04/09/05/pyramids-1496253_960_720.png' },
    { id: 3, iconUrl: 'https://www.urbs.curitiba.pr.gov.br/uploads/galeriaNoticaImagens/a3ae8215b0b2050aba367623ce9d3205ca7a512c.png' },
    { id: 4, iconUrl: 'https://images.vexels.com/media/users/3/160071/isolated/preview/8a4c9b162a4495af9185c91a57b6334f-cachorro-fofo-com-cauda-de-cachorro-e-lingua-achatada.png' },
    { id: 5, iconUrl: 'https://i.pinimg.com/originals/63/c2/85/63c285141e9a8f5cbc036b577f56a7dd.png' },
    { id: 6, iconUrl: 'https://static.wixstatic.com/media/6aef1d_b6dd7a4c993c46b89f5ecf23769bbbe5~mv2_d_1264_1332_s_2.png/v1/fill/w_949,h_1000,al_c,q_90,usm_0.66_1.00_0.01/6aef1d_b6dd7a4c993c46b89f5ecf23769bbbe5~mv2_d_1264_1332_s_2.png' },
    // Adicione mais ícones conforme necessário
];

interface ComboBoxProps {
    label: string;
    values: string[];
    onValueSelect: (selectedValue: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, values, onValueSelect }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        onValueSelect(selectedValue);
    };

    return (
        <div>
            <label>{label}</label>
            <select onChange={handleChange}>
                {values.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

const AlterarSenha: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [matricula, setMatricula] = useState('');
    const [senha, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const characters = [5, 3, 1, 2, 0, 4];
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { isLoggedIn } = userLogin;

    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

    const generateDays = (month: string) => {
        const daysInMonth = new Date(2023, parseInt(month, 10), 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, index) =>
            (index + 1).toString().padStart(2, '0')
        );
        return daysArray;
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);

        if (selectedDay && parseInt(selectedDay, 10) > generateDays(month).length) {
            setSelectedDay('');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatricula(e.target.value);
    };

    const handleCharacterClick = (char: string) => {
        if (senha.length < 6) {
            setPassword(senha + char);
        }
    };

    const handlePasswordReset = () => {
        setPassword('');
        setSelectedMonth('');
        setSelectedDay('');
    };

    const handleLogin = () => {
        if (senha.length === 6) {
            dispatch(loginUser({ matricula, senha }))
                .then(() => {
                    // Limpa o erro no caso de sucesso
                    setLoginError('');
                    handlePasswordReset();
                })
                .catch((error) => {
                    // Define a mensagem de erro
                    handlePasswordReset();
                    setLoginError('Precisa de ajuda? Procure seu gerente ou treinador.');
                });
        }
    };


    const handleAlterLogin = () => {
        if (senha.length === 6) {
            dispatch(alteraLoginUser({ matricula, senha, selectedDay, selectedMonth }))
                .then(() => {
                    // Limpa o erro no caso de sucesso
                    setLoginError('');
                    handlePasswordReset();
                })
                .catch((error) => {
                    // Define a mensagem de erro
                    handlePasswordReset();
                    setLoginError('Erro no Login, Verifique seu Codigo de Acesso.');
                });
        }
    };


    return (
        <>
            <div className="login-container" style={{ display: `${!isLoggedIn ? 'none' : 'block'}`, width: '310px' }}>
                <h2>{userLogin.userInfo?.nome}</h2>
                <br />
                <div>
                    <label htmlFor="email"></label>
                    <input
                        type="number"
                        id="matricula"
                        value={userLogin.userInfo?.matricula}
                        onChange={handleEmailChange}
                        placeholder="Digite sua Matrícula"
                        required
                        inputMode="numeric"
                        disabled={!isLoggedIn ? false : true}
                    />

                </div>
                <div className='icone-usuario'>
                    <FaUser size={40} color='black' />
                </div>
                
                <div className='data-aniversario' style={{ display: 'flex' }}>
                    <ComboBox label="Dia" values={generateDays(selectedMonth)} onValueSelect={setSelectedDay} />
                    <ComboBox label="Mês" values={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} onValueSelect={handleMonthChange} />

                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        placeholder='Codigo de Acesso'
                        readOnly
                        required

                    />
                    <div className='icone-senha'>
                        <FaLock size={40} color={`${senha.length === 6 ? 'green' : 'black'}`} />
                    </div>

                    <button className='limpar-senha' onClick={handlePasswordReset}><GiBroom size={20} color="white" /></button>
                    {loginError && <div className="alert alert-danger">{loginError}</div>}

                    <br />
                    <div className="virtual-keyboard" >
                        {characters.map((char, index) => (
                            <button
                                key={index}
                                onClick={() => handleCharacterClick(index.toString())}
                                disabled={senha.length >= 6}
                            >

                                {icons[char] && <img src={icons[char].iconUrl} alt={`Icon ${char}`} />}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleAlterLogin} disabled={senha.length !== 6 || isLoggedIn ? false : true}>
                    <FaSave size={48} color="black" />
                    <p>Salvar</p>
                </button>

            </div>

            <div className="login-container" style={{ display: `${isLoggedIn ? 'none' : 'block'}` }}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email"></label>
                    <input
                        type="number"
                        id="matricula"
                        value={matricula}
                        onChange={handleEmailChange}
                        placeholder="Digite sua Matrícula"
                        required
                        inputMode="numeric"
                        disabled={!isLoggedIn ? false : true}
                    />

                </div>
                <div className='icone-usuario'>
                    <FaUser size={40} color='black' />
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        placeholder='Codigo de Acesso'
                        readOnly
                        required
                        disabled={!isLoggedIn ? false : true}
                    />
                    <div className='icone-senha'>
                        <FaLock size={40} color={`${senha.length === 6 ? 'green' : 'black'}`} />
                    </div>

                    <button className='limpar-senha' onClick={handlePasswordReset}><GiBroom size={20} color="white" /></button>
                    {loginError && <div className="alert alert-danger">{loginError}</div>}

                    <br />
                    <div className="virtual-keyboard" >
                        {characters.map((char, index) => (
                            <button
                                key={index}
                                onClick={() => handleCharacterClick(index.toString())}
                                disabled={senha.length >= 6 || !isLoggedIn ? false : true}
                            >

                                {icons[char] && <img src={icons[char].iconUrl} alt={`Icon ${char}`} />}
                            </button>
                        ))}
                    </div>

                </div>
                <button onClick={handleLogin} disabled={senha.length !== 6 || !isLoggedIn ? false : true}>
                    <FaSignInAlt size={48} color="green" />
                    <p>Login</p>
                </button>

                <Link to="/meuperfil"><button>Cadastro</button></Link>
            </div>
        </>
    );
};

export default AlterarSenha;
