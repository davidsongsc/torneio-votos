import React from 'react';
import { Link } from 'react-router-dom';
interface Person {
    id: number;
    name: string;
    alcunha: string;
    imagem: string;
    votes: number;
}

const data: Person[] = [
    { id: 1, name: 'Belisazrio Borba', alcunha: 'presidente', imagem: 'perfil', votes: 15 },
    { id: 2, name: 'Cipliano Pinto', alcunha: '', imagem: 'perfil', votes: 10 },
    { id: 3, name: 'Maria Manoela', alcunha: '', imagem: 'perfil', votes: 5 },
    { id: 4, name: 'Lucia Cleides', alcunha: '', imagem: 'perfil', votes: 8 },
    { id: 5, name: 'Marta Rosa', alcunha: '', imagem: 'perfil', votes: 3 },
    { id: 6, name: 'Eliane Leonel', alcunha: '', imagem: 'perfil', votes: 10 },
    { id: 7, name: 'Bruna Carla', alcunha: '', imagem: 'perfil', votes: 5 },
    { id: 8, name: 'Mauricio de souza ', alcunha: '', imagem: 'perfil', votes: 8 },
    { id: 9, name: 'George Neto', alcunha: '', imagem: 'perfil', votes: 1 },
    // Adicione mais pessoas conforme necessário
];

const Ranking: React.FC = () => {
    const sortedData = data.sort((a, b) => b.votes - a.votes);
    return (
        <table className='tabela-objetivos-conteste'>
            <thead>
                <tr>
                    <th style={{ width: '10px' }}>Posição</th>
                    <th style={{ width: '50px' }}>Nome</th>
                    <th style={{ width: '50px' }}>Votos</th>

                </tr>
            </thead>
            <tbody>
                {sortedData.slice(0, 20).map((person, index) => (
                    <tr key={index}>
                        <td style={{ width: '10px' }}>{index + 1}º</td>
                        <td style={{ width: '50px' }}><Link to={`/perfil/${person.id}`}>{person.name}</Link></td>
                        <td style={{ width: '50px' }}>{person.votes} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Ranking;
