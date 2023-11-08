import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { loginUser } from '../actions/userActions';
import { RootState } from '../reducers';
import { GiBroom } from 'react-icons/gi';
import { FaUser, FaSignInAlt, FaLock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
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
    const [matricula, setMatricula] = useState('');
    const [senha, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const characters = [5, 3, 1, 2, 0, 4];
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { isLoggedIn } = userLogin;
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

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
    };

    const handleLogin = () => {
        if (senha.length === 6) {
            dispatch(loginUser({ matricula, senha }))
                .then(() => {
                    // Limpa o erro no caso de sucesso
                    setLoginError('');
                })
                .catch((error) => {
                    // Define a mensagem de erro
                    setLoginError('Erro no Login, Verifique seu Codigo de Acesso.');
                });
        }
    };


    return (
        <>
            <div className="login-container" style={{ display: `${!isLoggedIn ? 'none' : 'block'}`, width: '80%' }}>
                <h2>Usuario Autenticado</h2>
                <br />
                <div>
                    <h3>
                        Torneio de Votos: Regras e Objetivos
                    </h3>
                    <h4>
                        Objetivos:
                    </h4>
                    <ul>
                        <li> - Fomentar a interação e colaboração entre os colaboradores.</li>
                        <li> - Reconhecer e premiar aqueles que se destacam em nosso ambiente de trabalho.</li>
                        <li> - Incentivar a criatividade e a participação ativa.</li>
                    </ul>
                    <h4>
                        Regras:
                    </h4>
                    <ol>
                        <li>  Votos Bônus: No final de cada torneio, todos os colaboradores recebem 1 voto. Caso a meta do torneio seja positiva, todos recebem 1 voto bônus.</li>
                        <li>  Desafio Cumprido: Se a meta do torneio for atingida na íntegra, todos recebem +1 voto.</li>
                        <li>  Votação Justa: Uma pessoa não pode votar em si própria ou na mesma pessoa.</li>
                        <li>  Interação: Os votantes devem interagir entre si para conquistar os votos de seus colegas.</li>
                        <li>  Prêmio Mensal: A pessoa que receber mais votos no torneio do mês receberá o prêmio.</li>
                        <li>  Empate: Em caso de empate, um sorteio será realizado entre os empatantes para determinar o vencedor.</li>
                    </ol>
                    <h4>
                        Duração:
                    </h4>

                    <p>- Cada torneio terá uma duração específica, e os prazos de submissão, votação e anúncio dos resultados serão comunicados para cada torneio individualmente.</p>
                    <h4>
                        Tema:
                    </h4>
                    <p>Cada torneio pode ter um tema ou tópico específico. Fique atento às instruções para cada torneio.</p>
                    <h4>
                        Critérios de Avaliação:
                    </h4>
                    <p>Os critérios de avaliação podem variar de acordo com o tema do torneio e serão comunicados com antecedência.</p>
                    <h4>
                        Participação Ativa:
                    </h4>
                    <p>Incentivamos a participação ativa, que inclui não apenas buscar votos, mas também contribuir de maneira significativa, apresentar ideias e oferecer feedback construtivo.</p>
                    <h4>
                        Prêmios e Reconhecimento:
                    </h4>
                    <p>Além do prêmio para o vencedor, prêmios menores podem ser oferecidos para categorias como "Melhor Colaborador" ou "Melhor Espírito Esportivo."</p>
                    <h4>
                        Dúvidas e Feedback:
                    </h4>
                    <p>- Qualquer dúvida sobre as regras ou o torneio em geral pode ser esclarecida por meio de um canal de comunicação dedicado. Se você tiver sugestões ou feedback, não hesite em compartilhá-los.</p>

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

            </div>
        </>
    );
};

export default Login;
