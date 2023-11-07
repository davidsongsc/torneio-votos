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
    { id: 1, name: 'Belisazrio Cavalcante', alcunha: 'presidente', imagem: 'perfil', votes: 5 },
    { id: 2, name: 'Cipliano Pinto', alcunha: '', imagem: 'perfil', votes: 6 },
    { id: 3, name: 'Maria Manoela', alcunha: '', imagem: 'perfil', votes: 3 },
    { id: 4, name: 'Lucia Cleides', alcunha: '', imagem: 'perfil', votes: 11 },
    { id: 5, name: 'Marta Rosa', alcunha: '', imagem: 'perfil', votes: 1 },
    { id: 6, name: 'Eliane Leonel', alcunha: '', imagem: 'perfil', votes: 2 },
    { id: 7, name: 'Bruna Carla', alcunha: '', imagem: 'perfil', votes: 2 },
    { id: 8, name: 'Mauricio de souza ', alcunha: '', imagem: 'perfil', votes: 4 },
    { id: 9, name: 'George Neto', alcunha: '', imagem: 'perfil', votes: 1 },
    // Adicione mais pessoas conforme necessário
];

const Ranking: React.FC = () => {
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
