import React, { useState, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { loginUser, resetVotesWithPassword } from '../actions/userActions';
import { fetchUsers, fetchMostVoted, fetchListarVotos, logoutUser } from '../actions/userActions';
import { FaLock } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
const MenosVotos: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const navigate = useNavigate();
  const [resposta, setResposta] = useState<string | null>(null);
  const [senha, setPassword] = useState('');
  const [liberadoCodigo, setliberadoCodigo] = useState<boolean>(false);
  const [loginError, setLoginError] = useState('');
  const characters = [5, 3, 1, 2, 0, 4];
  const userLogin = useSelector((state: RootState) => state.userReducer);
  const { isLoggedIn, userInfo } = userLogin;
  const nivel = userInfo?.alcunha.split(',')[0].trim();

  const handleCharacterClick = (char: string) => {
    if (senha.length < 6) {
      console.log(senha.length)
      setPassword(senha + char);
    }
  };

  const handlePasswordReset = () => {
    setPassword('');
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResposta(event.target.value);
  };


  useEffect(() => {
    console.log(senha);
    if (isLoggedIn) {
      if (senha.length === 6) {
        dispatch(loginUser({ matricula: `${userInfo?.matricula}`, senha }))
          .then(() => {
            // Limpa o erro no caso de sucesso
            setLoginError('');
            handlePasswordReset();
            resetVotesWithPassword('Rk2kbkb')(dispatch);
            dispatch(fetchUsers());
            alert('Todos os votos restantes foram removidos!');
            setResposta('NÃO');
            navigate('/ranking');
            dispatch(logoutUser());
          })
          .catch((error) => {
            // Define a mensagem de erro
            handlePasswordReset();
            setLoginError(
              'Precisa de ajuda? Procure seu gerente ou treinador.'
            );
            alert('Entrada invalida, codigo não reconhecido!');
          });
      }
    }
  }, [senha]);

  useEffect(() => {
    if (!userInfo){
     navigate('/ranking');
    }
 }, [userInfo, navigate]);
 
  return (
    <>{userInfo?.matricula === 970016 || userInfo?.matricula === 10338 ? <div className='painel-controlador-votos'>
      <h1>Limpar voto de todos os participantes?</h1>

      <div>
        <label>
          <input
            type="radio"
            name="resposta"
            value="SIM"
            checked={resposta === 'SIM'}
            onChange={handleRadioChange}
          />
          SIM
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="resposta"
            value="NÃO"
            checked={resposta === 'NÃO'}
            onChange={handleRadioChange}
          />
          NÃO
        </label>
      </div>

      <div>
        <h2>Sua escolha: {resposta}</h2>
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
          disabled={resposta === "SIM" ? true : false}
        />
        <div className='icone-senha'>
          <FaLock size={40} color={`${senha.length === 6 ? 'green' : 'black'}`} />
        </div>

        <button className='limpar-senha' onClick={handlePasswordReset}><GiBroom size={20} color="red" /></button>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
      </div>
      <div className="virtual-keyboard" style={{ display: `${resposta !== 'SIM' ? 'none' : ''}` }}>
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
    </div> : <></>}

    </>
  );
}

export default MenosVotos;
