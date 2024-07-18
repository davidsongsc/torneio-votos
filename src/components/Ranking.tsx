import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchUsers, fetchMostVoted, fetchListarVotos } from '../actions/userActions';
import Cubo from './Cubo';

const Ranking: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mostVoted = useSelector((state: RootState) => state.userReducer.mostVoted);
  const [lastClickedUserId, setLastClickedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleUserClick = (userId: number) => setLastClickedUserId(userId);
  const handleLinkClick = (userId: number) => navigate(`/perfil/${userId}`);

  useEffect(() => {
    setLoading(true);

    Promise.all([dispatch(fetchUsers()), dispatch(fetchMostVoted()), dispatch(fetchListarVotos() as any)])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [dispatch]);

  const renderMedalImage = (position: number | null) => {
    const medals: Record<number, string> = {
      1: 'https://static.vecteezy.com/system/resources/previews/001/197/144/non_2x/first-place-ribbon-png.png',
      2: 'https://images.vexels.com/media/users/3/298856/isolated/preview/9546c2f56e16da035b151b3d4085584d-fita-vermelha-de-segundo-lugar.png',
      3: 'https://images.vexels.com/media/users/3/298870/isolated/lists/1119dfd405b38ae46ead3451c722dae8-fita-de-competia-a-o-roxa-de-terceiro-lugar.png',
    };

    if (position !== null && position <= 3) {
      return (
        <img
          src={medals[position]}
          alt={`Posição ${position}`}
          width={position > 1 ? '90px' : '80px'}
          style={{ borderRadius: '50%' }}
        />
      );
    }

    return null;
  };

  const sortedData = mostVoted
    ? [...mostVoted].sort((a, b) => Number(b.votosRecebidos) - Number(a.votosRecebidos))
    : [];

  return (
    <>{loading ?
      <Cubo />
      :
      <table className='tabela-objetivos-conteste'>
        <thead>
          <tr>
            <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>↓</th>
          </tr>
        </thead>
        {loading ? (
          <div style={{ height: '99vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', zIndex: '100', width: '100%' }}>
            <div className='contagem-c1'>
              <div className='contagem-c2'>
                <div>
                  <div className='contagem' />
                  <div className='contagem-r' />
                </div>
                <div>
                  <div className='contagem-x' />
                  <div className='contagem-n' />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <tbody>
            {sortedData.map((person, index) => {
              const isClickedUser = person.id === lastClickedUserId;
              const position = person.votosRecebidos > 0 ? index + 1 : null;

              return (
                <tr key={index} style={{display: `${person.votosRecebidos ===0 ? 'none' : ''}`,}}>
                  <td
                    onClick={() => handleLinkClick(person.id)}
                    className={`ranking-votos td-menor ${!isClickedUser ? 'none-none' : ''}`}
                    style={{ color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10', border: '1px solid' }}
                  >
                    V {person.votosRecebidos !== null ? person.votosRecebidos.toString() : null}
                  </td>
                  <td
                    className={`ranking-votos td-menor ${!isClickedUser ? 'none-none' : ''}`}
                    style={{ width: '55%', letterSpacing: '1px', color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10' }}
                  >
                    <p>{person.alcunha}</p>
                  </td>
                  <td
                    onClick={() => handleLinkClick(person.id)}
                    className={`ranking-votos td-menor ${!isClickedUser ? 'none-none' : ''}`}
                    style={{ width: '15%', letterSpacing: '1px', borderLeft: '1px solid white', color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10' }}
                  >
                    perfil
                  </td>
                  <td
                    className={`ranking-index ${isClickedUser ? '' : ''}`}
                    style={{
                      width: '10%',
                      borderTopLeftRadius: '5px',
                      borderBottomLeftRadius: '5px',
                      color: '#eaeaea',
                      backgroundColor: `${position && position < 10 ? '#ffa500' : position && position < 20 ? '#1152d2' : position && position < 30 ? '#9acd32' : position && position < 40 ? '#8b008b' : position && position < 50 ? '#09809d' : '#b7410e'}`,
                      borderColor: `${position && position < 10 ? '#eaeaea' : 'black'}`,
                    }}
                  >
                    {renderMedalImage(position)}
                  </td>
                  <td onClick={() => handleUserClick(person.id)} className={`ranking-nome td-maior ${isClickedUser ? 'ativacao-perfil' : ''}`}>
                    {person.nome}
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    }

    </>
  );
};

export default Ranking;
