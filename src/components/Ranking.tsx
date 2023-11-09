import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchUsers, fetchMostVoted } from '../actions/userActions';

const Ranking: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.userReducer.users);
    const mostVoted = useSelector((state: RootState) => state.userReducer.mostVoted);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchMostVoted());
    }, [dispatch]);

    const sortedData = users.sort((a, b) => b.votos - a.votos);
    console.log(mostVoted);
    return (
        <table className='tabela-objetivos-conteste'>
            <thead>
                <tr>
                    <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>↓</th>
                    <th style={{ width: '104.5px', color: 'black' }}>Nome</th>
                    <th style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a', borderColor: '#eaeaea' }}>V</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.slice(0, 20).map((person, index) => {
                    // Obtenha a quantidade de votos da pessoa usando o nome como chave em mostVoted
                    const mostVotedPerson = mostVoted ? mostVoted[person.id] : null;
                    const votos = mostVotedPerson !== undefined ? mostVotedPerson : 0;

                    return (
                        <tr key={index}>
                            <td style={{ width: '10px', color: '#eaeaea', backgroundColor: '#05808d', borderColor: '#eaeaea' }}>{index + 1}º</td>
                            <td style={{ width: '100px' }}><Link to={`/perfil/${person.id}`}>{person.nome}</Link></td>
                            <td style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a' }}>{votos !== null ? votos.toString() : null}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Ranking;
