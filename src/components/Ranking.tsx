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

    const handleUserClick = (userId: number) => {
        // Verifica se o último userId clicado é igual ao atual


        // Atualiza o último userId clicado
        setLastClickedUserId(userId);

        console.log(userId);
    };

    const handleShowTopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShowTop(Number(event.target.value));
    };


    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchMostVoted());
    }, [dispatch]);

    const sortedData = mostVoted ? mostVoted.sort((a, b) => Number(b.votosRecebidos) - Number(a.votosRecebidos)) : [];
    return (
        <>
            <div className='barra-top-top'>
                <label htmlFor="showTop">Quadro das equipes</label>
                <select id="showTop" value={showTop} onChange={handleShowTopChange}>
                    <option value={10}>TOP 10 Dourado</option>
                    <option value={20}>TOP 20 Azul</option>
                    <option value={30}>TOP 30 Verde Amarelado</option>
                    <option value={40}>TOP 40 Magenta</option>
                    <option value={99}>outros</option>
                </select>
            </div>
            <table className='tabela-objetivos-conteste'>
                <thead>
                    <tr>
                        <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>↓</th>
                        <th style={{ width: '104.5px', color: 'black' }}>Nome</th>

                        <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>V</th>

                    </tr>
                </thead>
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
                                                            'transparent'
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
                                    <td className={`ranking-votos ${!isClickedUser ? 'none-none' : ''}`} style={{ width: `${widthValue}px`, color: '#eaeaea', backgroundColor: '#1a1a1a', position: 'relative', zIndex: '10' }}>
                                        perfil
                                    </td>


                                </Link>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Ranking;
