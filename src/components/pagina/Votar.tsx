import React, { useState } from 'react';

interface Person {
    id: number;
    name: string;
    imagem: string;
    votes: number;
}

const Votar: React.FC = () => {
    const [voto, setVoto] = useState<number | null>(null); // Inicialmente nenhum voto selecionado
    const [search, setSearch] = useState<string>('');
    const pessoas: Person[] = [
        { id: 1, name: 'Fulano', imagem: 'perfil', votes: 15 },
        { id: 2, name: 'Ciclano', imagem: 'perfil', votes: 10 },
        { id: 3, name: 'Beltrano', imagem: 'perfil', votes: 5 },
        { id: 4, name: 'Outro Candidato', imagem: 'perfil', votes: 8 },
        { id: 5, name: 'Mais Um', imagem: 'perfil', votes: 3 },
        // Adicione mais pessoas conforme necessário
    ];

    const handleVotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVoto = parseInt(e.target.value, 10);
        setVoto(selectedVoto);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleVotar = () => {
        if (voto !== null) {
            // Aqui, você pode enviar o voto para o servidor ou realizar a lógica de votação necessária
            console.log('Votou em:', voto);
        }
    };

    // Filtrar os candidatos com base na pesquisa
    const filteredPessoas = pessoas.filter((pessoa) =>
        pessoa.name.toLowerCase().includes(search.toLowerCase())
    );

    // Ordenar os candidatos por votos em ordem decrescente
    const sortedPessoas = [...filteredPessoas].sort((a, b) => b.votes - a.votes);

    // Exibir apenas os 3 primeiros candidatos
    const top3Pessoas = sortedPessoas.slice(0, 3);

    return (
        <div>
            <form>
                <p>Escolha seu voto:</p>
                {top3Pessoas.map((pessoa) => (
                    <label key={pessoa.id}>
                        <img src={`https://dagesico.pythonanywhere.com/static/img/${pessoa.imagem}.png`} alt="Imagem Perfil" />
                        <input
                            type="radio"
                            name="voto"
                            value={pessoa.id}
                            checked={voto === pessoa.id}
                            onChange={handleVotoChange}
                        />

                        <div>

                            {pessoa.name} - {pessoa.votes} votos
                        </div>

                    </label>

                ))}
                <input
                    type="text"
                    placeholder="Pesquisar candidato"
                    value={search}
                    onChange={handleSearchChange}
                />
                <button type="button" onClick={handleVotar}>
                    Votar
                </button>
            </form>
        </div>
    );
};

export default Votar;
