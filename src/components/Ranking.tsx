import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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


    const handleUserClick = (userId: number) => {
        setLastClickedUserId(userId);
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
            <div className='barra-top-top'>
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
                        <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>V</th>
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
                        {sortedData.slice(0, showTop).map((person, index) => {
                            const isClickedUser = person.id === lastClickedUserId;
                            const widthValue = isClickedUser ? 110 : 100; // Define largura diferente para o usuário clicado

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
                                        }}>
                                        {(index + 1) <= 7 && `${index + 1}º`}
                                    </td>
                                    <td
                                        onClick={() => handleUserClick(person.id)}
                                        className={`ranking-nome ${isClickedUser ? 'ativacao-perfil' : ''}`}

                                    >
                                        {person.nome}
                                    </td>

                                    <Link to={`/perfil/${person.id}`}>
                                        <td className={`ranking-votos ${!isClickedUser ? 'none-none' : ''}`} style={{ width: `${widthValue}px`, color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10' }}>
                                            {person.votosRecebidos !== null ? person.votosRecebidos.toString() : null}
                                        </td>


                                    </Link>
                                    <Link to={`/perfil/${person.id}`}>
                                        <td className={`ranking-votos ${!isClickedUser ? 'none-none' : ''}`} style={{ width: `144px`, color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10' }}>
                                            perfil
                                        </td>


                                    </Link>

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
