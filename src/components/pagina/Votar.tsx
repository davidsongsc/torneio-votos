import React, { useState } from 'react';
import ConfirmVoto from './ConfirmaVoto';

interface Person {
    id: number;
    name: string;
    imagem: string;
    votes: number;
}

const Votar: React.FC = () => {
    const [voto, setVoto] = useState<number | null>(null); // Inicialmente nenhum voto selecionado
    const [search, setSearch] = useState<string>('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const pessoas: Person[] = [
        { id: 1, name: 'Fulano', imagem: 'perfil', votes: 15 },
        { id: 2, name: 'Ciclano', imagem: 'perfil', votes: 10 },
        { id: 3, name: 'Beltrano', imagem: 'perfil', votes: 5 },
        { id: 4, name: 'Lucia Cleides', imagem: 'perfil', votes: 8 },
        { id: 5, name: 'Marta Rosa', imagem: 'perfil', votes: 3 },
        { id: 6, name: 'barc', imagem: 'perfil', votes: 10 },
        { id: 7, name: 'Beltrano', imagem: 'perfil', votes: 5 },
        { id: 8, name: 'Maestro ', imagem: 'perfil', votes: 8 },
        { id: 9, name: 'Davidson George', imagem: 'perfil', votes: 1 },
        // Adicione mais pessoas conforme necessário
    ];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleVotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVoto = parseInt(e.target.value, 10);
        setVoto(selectedVoto);
    };

    const handleVotar = () => {
        if (voto !== null) {
            // Aqui, você pode enviar o voto para o servidor ou realizar a lógica de votação necessária
            console.log('Votou em:', voto);
            setShowConfirmDialog(true);
        }
    };

    const handleConfirm = () => {
        // Lógica de confirmação aqui (por exemplo, enviar o voto para o servidor)
        console.log('Votou em:', voto);

        // Fecha o diálogo de confirmação
        setShowConfirmDialog(false);
    };

    const handleCancel = () => {
        // Fecha o diálogo de confirmação
        setShowConfirmDialog(false);
    };

    // Filtrar os candidatos com base na pesquisa
    const filteredPessoas = pessoas.filter((pessoa) =>
        pessoa.name.toLowerCase().includes(search.toLowerCase())
    );

    // Ordenar os candidatos por votos em ordem decrescente
    const sortedPessoas = [...filteredPessoas].sort((a, b) => a.votes - b.votes);

    // Exibir apenas os 3 primeiros candidatos
    const top3Pessoas = sortedPessoas.slice(0, 4);

    return (
        <div>
            <form className='form-votacao-indica' style={{display: `${!showConfirmDialog ? 'block' : 'none'}`}}>
                <input
                    className='input-text-pesquisa'
                    type="text"
                    placeholder="Pesquisar candidato"
                    value={search}
                    onChange={handleSearchChange}
                />

                <div className='tela-painel-votos'>
                    {top3Pessoas.map((pessoa) => (
                        <label className='radio-label' key={pessoa.id} htmlFor={`radio-${pessoa.id}`}>
                            <div className='votante-lista-seletor'>
                                <img src={`https://dagesico.pythonanywhere.com/static/img/${pessoa.imagem}.jpg`} alt="Imagem Perfil" />
                                <h3>{pessoa.name} </h3>
                                <p>{pessoa.votes} votos</p>
                                <input
                                    className='radio-input'
                                    type="radio"
                                    name="voto"
                                    id={`radio-${pessoa.id}`}
                                    value={pessoa.id}
                                    checked={voto === pessoa.id}
                                    onChange={handleVotoChange}
                                />
                                <div className={`radio-custom${voto === pessoa.id ? ' radio-checked' : ''}`} />
                            </div>
                        </label>


                    ))}

                </div>
                <button className='btn-voto' type="button" onClick={handleVotar}>
                    Votar
                </button>
            </form>
            <ConfirmVoto
                open={showConfirmDialog}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                message="Você tem certeza que deseja votar?"
            />
        </div>
    );
};

export default Votar;
