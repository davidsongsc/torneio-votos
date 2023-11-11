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

    const sortedData = mostVoted ? mostVoted.sort((a, b) => Number(b.votosRecebidos) - Number(a.votosRecebidos)) : [];
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
                        <th style={{ width: '90px', color: 'black' }}>Nome</th>



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
                        {sortedData.slice(0, showTop).map((person, index, array) => {
                            const isClickedUser = person.id === lastClickedUserId;
                            const widthValue = isClickedUser ? 110 : 100; // Define largura diferente para o usuário clicado

                            const isFirstPlace = index === 0 || person.votosRecebidos === array[0].votosRecebidos;
                            const isSecondPlace = index === 1 || person.votosRecebidos === array[1].votosRecebidos;
                            const isThirdPlace = index === 2 || person.votosRecebidos === array[2].votosRecebidos;

                            return (
                                <tr key={index}>
                                    <td
                                        className={`ranking-index ${isClickedUser ? '' : 'none-none'}`}
                                        style={{
                                            width: '110px',
                                            borderTopLeftRadius: '5px',
                                            borderBottomLeftRadius: '5px',
                                            color: '#eaeaea',
                                            backgroundColor: `${(index + 1) <= 10 ? '#ffa500' :
                                                (index + 1) <= 20 ? '#1152d2' :
                                                    (index + 1) <= 30 ? '#9acd32' :
                                                        (index + 1) <= 40 ? '#8b008b' :
                                                            (index + 1) <= 40 ? '#09809d' :
                                                                '#b7410e'
                                                }`,
                                            borderColor: `${(index + 1) <= 10 ? '#eaeaea' : 'black'}`,
                                        }}
                                    >
                                        {isFirstPlace && <img src='https://static.vecteezy.com/system/resources/previews/001/197/144/non_2x/first-place-ribbon-png.png' alt='Ouro' width='50px' style={{ borderRadius: '50%' }} />}
                                        {isSecondPlace && <img src='https://images.vexels.com/media/users/3/298856/isolated/preview/9546c2f56e16da035b151b3d4085584d-fita-vermelha-de-segundo-lugar.png' alt='Prata' width='90px' style={{ borderRadius: '50%' }} />}
                                        {isThirdPlace && <img src='https://images.vexels.com/media/users/3/298870/isolated/lists/1119dfd405b38ae46ead3451c722dae8-fita-de-competia-a-o-roxa-de-terceiro-lugar.png' alt='Bronze' width='90px' style={{ borderRadius: '50%' }} />}
                                    </td>

                                    <td
                                        onClick={() => handleLinkClick(person.id)}
                                        className={`ranking-votos td-menor ${!isClickedUser ? 'none-none' : ''}`}
                                        style={{ width: `${widthValue}px`, color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10', border: '1px solid' }}
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
                                    <td
                                        onClick={() => handleUserClick(person.id)}
                                        className={`ranking-nome td-maior ${isClickedUser ? 'ativacao-perfil' : ''}`}
                                    >
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
