import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchUsers, fetchMostVoted } from '../actions/userActions';

const Ranking: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const mostVoted = useSelector((state: RootState) => state.userReducer.mostVoted);
    const [showTop, setShowTop] = useState<number>(80); // Estado para rastrear a quantidade a ser exibida
    const [lastClickedUserId, setLastClickedUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleUserClick = (userId: number) => {
        setLastClickedUserId(userId);
    };
    const handleLinkClick = (userId: number) => {
        navigate(`/perfil/${userId}`);
    };
    const handleShowTopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShowTop(Number(event.target.value));
    };

    useEffect(() => {
        setLoading(true);

        Promise.all([dispatch(fetchUsers()), dispatch(fetchMostVoted())])
            .then(() => setLoading(false))
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [dispatch]);

    const sortedData = mostVoted
        ? mostVoted
            .slice() // Cria uma cópia para evitar a mutação do array original
            .sort((a, b) => Number(b.votosRecebidos) - Number(a.votosRecebidos))
        : [];
    return (
        <>
            <div className='barra-top-top' style={{ display: 'none' }}>
                <label htmlFor="showTop">Grupos</label>
                <select id="showTop" value={showTop} onChange={handleShowTopChange}>
                    <option value={99}>Ranking</option>
                    <option value={10}>TOP 10 Dourado</option>
                    <option value={20}>TOP 20 Azul</option>
                    <option value={30}>TOP 30 Verde Amarelado</option>
                    <option value={40}>TOP 40 Magenta</option>

                </select>
            </div>
            <table className='tabela-objetivos-conteste'>
                <thead>
                    <tr>
                        <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>↓</th>


                    </tr>
                </thead>
                {loading ? (
                    // Renderize o componente de loading aqui
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

                            // Verifica se a pessoa tem votos antes de atribuir uma posição
                            const position = person.votosRecebidos > 0 ? index + 1 : null;

                            let medalImage;
                            if (position) {
                                if (position === 1 || (index > 0 && person.votosRecebidos === sortedData[index - 1].votosRecebidos)) {
                                    medalImage = (
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/001/197/144/non_2x/first-place-ribbon-png.png"
                                            alt="Ouro"
                                            width="50px"
                                            style={{ borderRadius: '50%' }}
                                        />
                                    );
                                } else if (position === 2 ) {
                                    medalImage = (
                                        <img
                                            src="https://images.vexels.com/media/users/3/298856/isolated/preview/9546c2f56e16da035b151b3d4085584d-fita-vermelha-de-segundo-lugar.png"
                                            alt="Prata"
                                            width="90px"
                                            style={{ borderRadius: '50%' }}
                                        />
                                    );
                                } else if (position === 3) {
                                    medalImage = (
                                        <img
                                            src="https://images.vexels.com/media/users/3/298870/isolated/lists/1119dfd405b38ae46ead3451c722dae8-fita-de-competia-a-o-roxa-de-terceiro-lugar.png"
                                            alt="Bronze"
                                            width="90px"
                                            style={{ borderRadius: '50%' }}
                                        />
                                    );
                                }
                            }

                            return (
                                <tr key={index}>
                                    <td
                                        className={`ranking-index ${isClickedUser ? '' : ''}`}
                                        style={{
                                            width: '70px',
                                            borderTopLeftRadius: '5px',
                                            borderBottomLeftRadius: '5px',
                                            color: '#eaeaea',
                                            backgroundColor: `${position && position < 10 ? '#ffa500' : position && position < 20 ? '#1152d2' : position && position < 30 ? '#9acd32' : position && position < 40 ? '#8b008b' : position && position < 50 ? '#09809d' : '#b7410e'
                                                }`,
                                            borderColor: `${position && position < 10 ? '#eaeaea' : 'black'}`,
                                        }}
                                    >
                                        {medalImage}
                                    </td>
                                    <td
                                        onClick={() => handleLinkClick(person.id)}
                                        className={`ranking-votos td-menor ${!isClickedUser ? 'none-none' : ''}`}
                                        style={{ color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10', border: '1px solid' }}
                                    >
                                        V {person.votosRecebidos !== null ? person.votosRecebidos.toString() : null}
                                    </td>
                                    <td
                                        onClick={() => handleLinkClick(person.id)}
                                        className={`ranking-votos td-menor ${!isClickedUser ? 'none-none' : ''}`}
                                        style={{ width: `144px`, color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10' }}
                                    >
                                        perfil
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
        </>
    );
};

export default Ranking;
