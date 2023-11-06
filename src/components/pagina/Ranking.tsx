import React from 'react';
interface Person {
    pessoa: string;
    voto: number;
}

const data: Person[] = [
    { pessoa: 'Albano', voto: 8 },
    { pessoa: 'Beltrano', voto: 11 },
    { pessoa: 'Ciclano', voto: 13 },
    { pessoa: 'Eltano', voto: 7 },
    { pessoa: 'Fulano', voto: 5 },
    { pessoa: 'Gutamo', voto: 8 },
    { pessoa: 'Eltano', voto: 7 },
    { pessoa: 'Fulano', voto: 5 },
    { pessoa: 'Gutamo', voto: 8 },
    { pessoa: 'Eltano', voto: 7 },
    { pessoa: 'Fulano', voto: 5 },
    { pessoa: 'Gutamo', voto: 8 },
    { pessoa: 'Itano', voto: 4 },
    { pessoa: 'Itano', voto: 4 },
    { pessoa: 'Itano', voto: 4 },
    { pessoa: 'Itano', voto: 4 },
    { pessoa: 'Gutamo', voto: 8 },
    { pessoa: 'Itano', voto: 4 },
    { pessoa: 'Itano', voto: 4 },
    { pessoa: 'Itano', voto: 4 },
    { pessoa: 'Itano', voto: 4 },

];

const Ranking: React.FC = () => {
    const sortedData = data.sort((a, b) => b.voto - a.voto);
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
                {sortedData.slice(0, 20).map((person, index) => (
                    <tr key={index}>
                        <td style={{width: '10px'}}>{index + 1}º</td>
                        <td style={{width: '50px'}}>{person.pessoa}</td>
                        <td style={{width: '50px'}}>{person.voto} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Ranking;
