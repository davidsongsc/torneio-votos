import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchUsers, fetchMostVoted } from '../actions/userActions';

const Ranking: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const mostVoted = useSelector((state: RootState) => state.userReducer.mostVoted);
    const [showTop, setShowTop] = useState<number>(40); // Estado para rastrear a quantidade a ser exibida
    const userLogin = useSelector((state: RootState) => state.userReducer);


    const handleShowTopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShowTop(Number(event.target.value));
    };
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchMostVoted());
    }, [dispatch]);

    const sortedData = mostVoted ? mostVoted.sort((a, b) => Number(b.votosRecebidos) - Number(a.votosRecebidos)) : [];
    console.log(mostVoted);
    return (
        <>
            <div className='barra-top-top'>
                <label htmlFor="showTop">Quadro das equipes</label>
                <select id="showTop" value={showTop} onChange={handleShowTopChange}>
                    <option value={10}>Equipe Dourada</option>
                    <option value={20}>Equipe Azul</option>
                    <option value={30}>Equipe Verde Amarelado</option>
                    <option value={40}>Equipe Magenta</option>
                    <option value={60}>Equipe Teal</option>
                </select>
            </div>
            <table className='tabela-objetivos-conteste'>
                <thead>
                    <tr>
                        <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>↓</th>
                        <th style={{ width: '104.5px', color: 'black' }}>Nome</th>
                        {/*
                        <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>V</th>
                        */}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.slice(0, showTop).map((person, index) => {
                        return (
                            <tr key={index}>
                                <td style={{
                                    width: '10px',
                                    color: '#eaeaea',
                                    backgroundColor: `${(index + 1) <= 10 ? '#ffa500' :
                                            (index + 1) <= 20 ? '#1152d2' :
                                                (index + 1) <= 30 ? '#9acd32' :
                                                    (index + 1) <= 40 ? '#8b008b' :
                                                        (index + 1) <= 40 ? '#05808d' :
                                                            'transparent'  
                                        }`,
                                    borderColor: `${(index + 1) <= 10 ? '#eaeaea' : 'black'}`,
                                    display: userLogin.userInfo ? 'table-cell' : 'none'  
                                }}>
                                    {(index + 1) <= 7 && `${index + 1}º`}
                                </td>
                                <td style={{ width: '100px' }}><Link to={`/perfil/${person.id}`}>{person.nome}</Link></td>
                                {/*
                                <td style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a' }}>
                                    {person.votosRecebidos !== null ? person.votosRecebidos.toString() : null}
                                </td>
                                 */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Ranking;
