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
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const voto = useSelector((state: RootState) => state.votoReducer.voto);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedVoto, setSelectedVoto] = useState<number | null>(null);
    const [isClickLocked, setClickLock] = useState(false);

    useEffect(() => {
        // Rolando para o topo da página quando o componente é montado
        window.scrollTo(0, 0);
    }, []);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleVotoChange = (clickedVoto: number) => {
        if (!isClickLocked) {
            setClickLock(true);


            // Limpa selectedVoto se o usuário clicar em outra pessoa
            setSelectedVoto((prevVoto) => (prevVoto === clickedVoto ? null : clickedVoto));

            // Atualiza o voto apenas se clickedVoto não for nulo
            if (clickedVoto !== null) {
                if (selectedVoto === clickedVoto) {
                    dispatch(votar(0));
                }
                else {
                    dispatch(votar(clickedVoto));
                }

            }

            // Desbloqueia o clique após um pequeno intervalo de tempo
            setTimeout(() => {
                setClickLock(false);
            }, 500);
        }
    };


    const handleVotar = () => {
        if (voto !== null) {
            if (voto !== 0) {
                setShowConfirmDialog(true);
            }
            else { alert('Você precisa escolher alguém!') }
        }
    };

    const handleConfirm = () => {
        if (voto !== null) {
            dispatch(concretizarVotoAsync(voto));
            setShowConfirmDialog(false);
            dispatch(votar(0));
            alert('Voto realizado com sucesso!')
        }
    };

    const handleCancel = () => {
        setShowConfirmDialog(false);
        dispatch(votar(0));

    };

    const filteredPessoas = pessoas.filter((pessoa) =>
        pessoa.nome.toLowerCase().includes(search.toLowerCase()) || pessoa.alcunha.toLowerCase().includes(search.toLowerCase())
    );

    const sortedPessoas = [...filteredPessoas].sort((a, b) => a.votosRecebidos - b.votosRecebidos);
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
                        <div key={pessoa.id} onClick={() => handleVotoChange(pessoa.id)}>
                            <label
                                className={`radio-label ${pessoa.id === voto ? 'radio-label-selecionado' : 'radio-label-nao-selecionado'} ${pessoa.id === voto && showConfirmDialog ? 'radio-label-voto' : 'radio-label-voto-nao'}`}
                                htmlFor={`radio-${pessoa.id}`}
                                style={{ display: `${pessoa.id === usuarioLogado ? 'none' : ''}` }}>
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
                                        onChange={() => handleVotoChange(pessoa.id)}
                                    />
                                    <div className={`radio-custom ${pessoa.id === voto ? ' radio-checked' : ' radio-not-checked'}`} />
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                <div style={{
                    position: 'relative',
                    zIndex: '133',
                }}>

                    <h2 style={{ padding: '13px 0' }}>
                        <strong style={{ fontSize: '30px', fontFamily: 'Times New Roman', backgroundColor: 'rgb(32, 39, 68)', borderStyle: 'groove', padding: '6px', borderRadius: '33px' }}>
                            {userLogin.userInfo?.votos}
                        </strong>
                    </h2>
                    <button className='btn-voto' type="button" onClick={handleVotar} style={{ display: `${!showConfirmDialog ? '' : 'none'}` }}>
                        Votar
                    </button>
                </div>

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
