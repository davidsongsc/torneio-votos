import React from 'react';
import { FaCoffee } from 'react-icons/fa';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';

const Tabela: React.FC = () => {
    const data = useSelector((state: RootState) => state.contestReducer.contest);

    return (
        <table className='tabela-objetivos'>
            <thead>
                <tr>
                    <th>Objetivo</th>
                    <th>Meta</th>
                    <th>Vendas</th>
                    <th>Prazo</th>
                </tr>
            </thead>
            <tbody>
                {data.slice(0, 17).map((contest, index) => (
                    <tr key={index}>
                        <td>{contest.objetivo}</td>
                        <td>{contest.meta} <FaCoffee /></td>
                        <td>{contest.vendas} <FaCoffee /></td>
                        <td>{contest.prazo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Tabela;
