import React from 'react';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';


const RankingGeral: React.FC = () => {
    const data = useSelector((state: RootState) => state.usuariosReducer.usuarios);
    const sortedData = data.sort((a, b) => b.votes - a.votes);
    return (
        <table className='tabela-objetivos-conteste'>
            <thead>
                <tr>
                    <th style={{width: '10px'}}>...</th>
                    <th style={{width: '50px'}}>Nome</th>
                    <th style={{width: '50px'}}>Votos</th>

                </tr>
            </thead>
            <tbody>
                {sortedData.map((person, index) => (
                    <tr key={index}>
                        <td style={{width: '10px'}}>{index + 1}º</td>
                        <td style={{width: '50px'}}>{person.name}</td>
                        <td style={{width: '50px'}}>{person.votes} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RankingGeral;
