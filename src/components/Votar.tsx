import React, { useState, useEffect } from 'react';
import ConfirmVoto from './ConfirmaVoto';
import { fetchUsers } from '../actions/userActions'; // Substitua pelo caminho correto
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { votar } from '../actions/votoActions';
import { concretizarVotoAsync } from '../actions/userActions';
import { AppDispatch } from '../store'; 

const Votar: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const pessoas = useSelector((state: RootState) => state.userReducer.users);
    const usuarioLogado = useSelector((state: RootState) => state.userReducer.userInfo?.matricula);
    const voto = useSelector((state: RootState) => state.votoReducer.voto);
    const dispatch = useDispatch<AppDispatch>();
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
            dispatch(concretizarVotoAsync(voto));
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

    useEffect(() => {
        dispatch(fetchUsers());

    }, [dispatch]);

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
                        <label className={`radio-label ${pessoa.id === voto ? 'radio-label-selecionado' : 'radio-label-nao-selecionado'} ${pessoa.id === voto && showConfirmDialog ? 'radio-label-voto' : 'radio-label-voto-nao'}`} key={pessoa.id} htmlFor={`radio-${pessoa.id}`} style={{ display: `${pessoa.id === usuarioLogado ? 'none' : ''}` }}>
                            <div className='votante-lista-seletor'>
                                <img src={`https://dagesico.pythonanywhere.com/static/img/${pessoa.imagem}`} alt="Imagem Perfil" />
                                <h3>{pessoa.nome} </h3>
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

export default Votar;
