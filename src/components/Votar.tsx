import React, { useState } from 'react';
import ConfirmVoto from './ConfirmaVoto';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { votar } from '../actions/votoActions'; // Substitua pelo caminho real
import { concretizarVoto } from '../actions/concretizarVoto';

const Votar: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const pessoas = useSelector((state: RootState) => state.usuariosReducer.usuarios);
   
    const voto = useSelector((state: RootState) => state.votoReducer.voto);
    const dispatch = useDispatch(); // Use o gancho useDispatch para despachar ações

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleVotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVoto = parseInt(e.target.value, 10);
        // Despache a ação para atualizar o voto
        dispatch(votar(selectedVoto));
    };

    const handleVotar = () => {
        if (voto !== null) {
            // Aqui, você pode enviar o voto para o servidor ou realizar a lógica de votação necessária
            setShowConfirmDialog(true);
        }
    };

    const handleConfirm = () => {
        if (voto !== null) {
            // Despache a ação para concretizar o voto
            dispatch(concretizarVoto(voto));

            // Fecha o diálogo de confirmação
            setShowConfirmDialog(false);
        }
    };

    const handleCancel = () => {
        // Fecha o diálogo de confirmação
        setShowConfirmDialog(false);
    };

    // Filtrar os candidatos com base na pesquisa
    const filteredPessoas = pessoas.filter((pessoa) =>
        pessoa.name.toLowerCase().includes(search.toLowerCase()) || pessoa.alcunha.toLowerCase().includes(search.toLowerCase())
    );

    // Ordenar os candidatos por votos em ordem decrescente
    const sortedPessoas = [...filteredPessoas].sort((a, b) => a.votes - b.votes);

    // Exibir apenas os 3 primeiros candidatos
    const top3Pessoas = sortedPessoas.slice(0, 4);

    return (
        <div>
            <form className='form-votacao-indica' >
                <input
                    className='input-text-pesquisa'
                    type="text"
                    placeholder="Pesquisar candidato"
                    value={search}
                    onChange={handleSearchChange}
                    style={{ display: `${!showConfirmDialog ? 'block' : 'none'}` }}
                />

                <div className='tela-painel-votos'>
                    {top3Pessoas.map((pessoa) => (
                        <label className={`radio-label ${pessoa.id === voto ? 'radio-label-selecionado' : 'radio-label-nao-selecionado'} ${pessoa.id === voto && showConfirmDialog ? 'radio-label-voto' : 'radio-label-voto-nao'}`} key={pessoa.id} htmlFor={`radio-${pessoa.id}`}>
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
                <button className='btn-voto' type="button" onClick={handleVotar} style={{ display: `${!showConfirmDialog ? '' : 'none'}` }}>
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



// Conecta o componente ao Redux
export default Votar;
