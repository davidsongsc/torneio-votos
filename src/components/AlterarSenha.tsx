import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { alteraLoginUser, loginUser } from '../actions/userActions';
import { RootState } from '../reducers';
import { GiBroom } from 'react-icons/gi';
import { FaUser, FaLock } from 'react-icons/fa';
import { fetchUsers, fetchMostVoted } from '../actions/userActions';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconName } from '@fortawesome/fontawesome-svg-core';

library.add(fas);
const icons = [
    { id: 1, iconClass: 'fa-square' },
    { id: 2, iconClass: 'fa-diamond' },
    { id: 3, iconClass: 'fa-play' },
    { id: 4, iconClass: 'fa-circle' },
    { id: 5, iconClass: 'fa-heart' },
    { id: 6, iconClass: 'fa-star' },
];
const iconSize = [48, 'gold'];
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
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState<string>('01');
    const [selectedMonth, setSelectedMonth] = useState<string>('12');
    const [matricula, setMatricula] = useState('');
    const [senha, setPassword] = useState('');
    const [liberadoCodigo, setliberadoCodigo] = useState<boolean>(true);

    const [loginError, setLoginError] = useState('');
    const characters = [5, 3, 1, 2, 0, 4];
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { isLoggedIn, mostVoted } = userLogin;
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  

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
        const novaMatricula = e.target.value;
        setMatricula(novaMatricula);
    };

    const handleCharacterClick = (char: string) => {
        if (senha.length < 6) {
            console.log(senha.length)
            setPassword(senha + char);
        }
    };

    const handlePasswordReset = () => {
        setPassword('');
        setSelectedMonth('01');
        setSelectedDay('01');
    };

    useEffect(() => {
        const listaMatriculas = (mostVoted ?? []).map(item => item.matricula);
        const matriculaExistente = listaMatriculas.includes(parseInt(matricula, 10));

        if (matriculaExistente) {
            console.log('Matrícula encontrada!');
            setliberadoCodigo(false);
        }
        else {
            setliberadoCodigo(true);

        }
    }, [matricula]);

    useEffect(() => {
        console.log(senha)
        if (isLoggedIn) {
            if (senha.length === 6) {
                const matricula = String(userLogin.userInfo?.matricula || '');
                dispatch(alteraLoginUser({ matricula, senha, selectedDay, selectedMonth }))
                    .then(() => {
                        // Limpa o erro no caso de sucesso
                        setLoginError('');
                        handlePasswordReset();
                        alert('Codigo alterado com sucesso!')
                        navigate('/regras');
                    })
                    .catch((error) => {
                        // Define a mensagem de erro
                        handlePasswordReset();
                        setLoginError('Erro no Login, Verifique seu Codigo de Acesso.');
                        alert('Entrada invalida, codigo não reconhecido!')
                    });
            }
        }
        else {
            if (senha.length === 6) {

                dispatch(loginUser({ matricula, senha }))
                    .then(() => {
                        // Limpa o erro no caso de sucesso
                        setLoginError('');
                        handlePasswordReset();
                        navigate('/votar');
                    })
                    .catch((error) => {
                        // Define a mensagem de erro
                        handlePasswordReset();
                        setLoginError('Precisa de ajuda? Procure seu gerente ou treinador.');
                        alert('Entrada invalida, codigo não reconhecido!')
                    });
            }
        }

    }, [senha]);

    useEffect(() => {

        Promise.all([dispatch(fetchUsers()), dispatch(fetchMostVoted())])
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [dispatch]);

    return (
        <>
            <div className="login-container" style={{ display: `${!isLoggedIn ? 'none' : 'block'}`, width: '420px' }}>
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
                <br />
                <h3>Data Nascimento</h3>
                <br />
                <div className='data-aniversario' >

                    <ComboBox label="Dia" values={generateDays(selectedMonth)} onValueSelect={setSelectedDay} />
                    <ComboBox label="Mês" values={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} onValueSelect={handleMonthChange} />

                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        placeholder='Novo codigo'
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
                                {icons[char] && <FontAwesomeIcon fontSize={iconSize[0]} icon={['fas', icons[char].iconClass as IconName]} />}                            </button>
                        ))}
                    </div>
                </div>
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
                        style={{ border: `4px solid ${liberadoCodigo ? 'transparent' : 'green'}` }}
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
                        disabled={liberadoCodigo}
                    />
                    <div className='icone-senha'>
                        <FaLock size={40} color={`${senha.length === 6 ? 'green' : 'black'}`} />
                    </div>

                    <button className='limpar-senha' onClick={handlePasswordReset}><GiBroom size={20} color="white" /></button>
                    {loginError && <div className="alert alert-danger">{loginError}</div>}
                </div>
                <div className="virtual-keyboard" style={{ display: `${liberadoCodigo ? 'none' : ''}` }}>
                    {characters.map((char, index) => (
                        <button
                            key={index}
                            onClick={() => handleCharacterClick(index.toString())}
                            disabled={senha.length >= 6}
                        >
                            {icons[char] && <FontAwesomeIcon fontSize={iconSize[0]} color={'#111111'} icon={['fas', icons[char].iconClass as IconName]} />}
                        </button>
                    ))}
                </div>

            </div>
        </>
    );
};

export default AlterarSenha;
