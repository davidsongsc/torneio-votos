import React, { useState } from 'react';
import ConfirmVoto from './ConfirmaVoto';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { votar } from '../actions/votoActions';
import { concretizarVoto } from '../actions/concretizarVoto';

const Votar: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const pessoas = useSelector((state: RootState) => state.usuariosReducer.usuarios);

    const voto = useSelector((state: RootState) => state.votoReducer.voto);
    const dispatch = useDispatch();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleVotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVoto = parseInt(e.target.value, 10);
        dispatch(votar(selectedVoto));
    };

    const handleVotar = () => {
        if (voto !== null) {
            setShowConfirmDialog(true);
        }
    };

    const handleConfirm = () => {
        if (voto !== null) {
            dispatch(concretizarVoto(voto));
            setShowConfirmDialog(false);
        }
    };

    const handleCancel = () => {
        setShowConfirmDialog(false);
    };

    const filteredPessoas = pessoas.filter((pessoa) =>
        pessoa.nome.toLowerCase().includes(search.toLowerCase()) || pessoa.alcunha.toLowerCase().includes(search.toLowerCase())
    );

    const sortedPessoas = [...filteredPessoas].sort((a, b) => a.votos - b.votos);
    const top3Pessoas = sortedPessoas.slice(0, 45);

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
                        <label className={`radio-label ${pessoa.matricula === voto ? 'radio-label-selecionado' : 'radio-label-nao-selecionado'} ${pessoa.matricula === voto && showConfirmDialog ? 'radio-label-voto' : 'radio-label-voto-nao'}`} key={pessoa.matricula} htmlFor={`radio-${pessoa.matricula}`}>
                            <div className='votante-lista-seletor'>
                                <img src={`https://dagesico.pythonanywhere.com/static/img/${pessoa.imagem}.jpg`} alt="Imagem Perfil" />
                                <h3>{pessoa.nome} </h3>
                                <p>{pessoa.votos} votos</p>
                                <input
                                    className='radio-input'
                                    type="radio"
                                    name="voto"
                                    id={`radio-${pessoa.matricula}`}
                                    value={pessoa.matricula}
                                    checked={voto === pessoa.matricula}
                                    onChange={handleVotoChange}
                                />
                                <div className={`radio-custom${voto === pessoa.matricula ? ' radio-checked' : ''}`} />
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
