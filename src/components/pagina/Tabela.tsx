import React from 'react';
import { FaCoffee } from 'react-icons/fa';
interface Person {
    contest: string;
    quantidade: string;
    atualQuantidade: string;
    dataEncerramento: string;
}

const data: Person[] = [
    { contest: '...', quantidade: '0', atualQuantidade: '0',  dataEncerramento: '11/2023' },
   
];

const Tabela: React.FC = () => {
    return (
        <table className='tabela-objetivos-conteste'>
            <thead>
                <tr>
                    <th>Objetivo</th>
                    <th>Meta</th>
                    <th>Vendas</th>
                    <th>Termina em</th>
                </tr>
            </thead>
            <tbody>
                {data.slice(0, 17).map((person, index) => (
                    <tr key={index}>
                        <td>{person.contest}</td>
                        <td>{person.quantidade} <FaCoffee /></td>
                        <td>{person.atualQuantidade} <FaCoffee /></td>
                        <td>{person.dataEncerramento}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Tabela;
