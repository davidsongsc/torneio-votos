import React from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';

const Ranking: React.FC = () => {
    const data = useSelector((state: RootState) => state.usuariosReducer.usuarios);

    const sortedData = data.sort((a, b) => b.votes - a.votes);
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
                {sortedData.slice(0, 20).map((person, index) => (
                    <tr key={index}>
                        <td style={{ width: '10px', color: '#eaeaea', backgroundColor: '#05808d', borderColor: '#eaeaea'  }}>{index + 1}º</td>
                        <td style={{ width: '100px' }}><Link to={`/perfil/${person.id}`}>{person.name}</Link></td>
                        <td style={{ width: '10px', color: '#eaeaea', backgroundColor: '#1a1a1a' }}>{person.votes} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Ranking;
