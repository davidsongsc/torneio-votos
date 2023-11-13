import React, { useState, useEffect } from 'react';
import ConfirmVoto from './ConfirmaVoto';
import { fetchUsers } from '../actions/userActions'; // Substitua pelo caminho correto
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { votar } from '../actions/votoActions';
import { concretizarVotoAsync } from '../actions/userActions';
import { AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';


const visual = { fontSize: '30px', fontFamily: 'Times New Roman', backgroundColor: 'rgb(32, 39, 68)', borderStyle: 'groove', padding: '6px', borderRadius: '33px' }
const Votar: React.FC = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const pessoas = useSelector((state: RootState) => state.userReducer.users);
    const usuarioLogado = useSelector((state: RootState) => state.userReducer.userInfo?.matricula);
    const usuarioVotos = useSelector((state: RootState) => state.userReducer.userInfo?.votos);
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const voto = useSelector((state: RootState) => state.votoReducer.voto);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedVoto, setSelectedVoto] = useState<number | null>(null);
    const [isClickLocked, setClickLock] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePesquisa = (valor: string) => {
        setSearch('')
        setSearch(valor)
    }
    const handleVotoChange = (clickedVoto: number) => {
        if (!isClickLocked) {
            setClickLock(true);
            setSelectedVoto((prevVoto) => (prevVoto === clickedVoto ? null : clickedVoto));
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

        if (voto !== null && usuarioVotos !== undefined && usuarioVotos > 0) {
            if (voto !== 0) {
                setShowConfirmDialog(true);
            }
            else { alert('Você precisa escolher alguém!') }

        }
        else {
            alert('Você não possui votos!')
        }
    };

    const handleConfirm = () => {
        if (voto !== null) {
            dispatch(concretizarVotoAsync(voto));
            setShowConfirmDialog(false);
            dispatch(votar(0));
            alert('Voto realizado com sucesso!')
            navigate('/ranking');
        }
    };

    const handleCancel = () => {
        setShowConfirmDialog(false);
        dispatch(votar(0));
        setSearch('');

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
        <div className='div-buttons'>
            <div className='equipes'>
                <button onClick={() => handlePesquisa('buss')}>Buss</button>
                <button onClick={() => handlePesquisa('apoio')}>Apoio</button>
                <button onClick={() => handlePesquisa('hostess')}>hostess</button>
                <button onClick={() => handlePesquisa('dish')}>Dish</button>
                <button onClick={() => handlePesquisa('clean')}>Clean</button>
                <button onClick={() => handlePesquisa('prep')}>Prep</button>
                <button onClick={() => handlePesquisa('linha fria')}>l. fria</button>
                <button onClick={() => handlePesquisa('linha quente')}>l. quente</button>
                <button onClick={() => handlePesquisa('waiter')}>waiter</button>
                <button onClick={() => handlePesquisa('bartender')}>bar</button>
                <button onClick={() => handlePesquisa('treinador')}>treinador</button>
                <button onClick={() => handlePesquisa('gerencia')}>gerencia</button>
                <button onClick={() => handlePesquisa('adm')}>adm</button>
                <button onClick={() => handlePesquisa('manuten')}>manutenção</button>
            </div>
            <form className='form-votacao-indica' >
                <div className='tela-painel-votos'>
                    {top3Pessoas.map((pessoa) => (
                        <div key={pessoa.id} >
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
                                <div style={{ display: `${pessoa.id === voto ? 'block' : 'none'}` }}>
                                    <button className='btn-voto' type="button" onClick={handleVotar} style={{ display: `${pessoa.id === voto ? 'radio-label-selecionado' : 'radio-label-nao-selecionado'}` }}>
                                        Votar
                                    </button>
                                    <button className='btn-voto' type="button" onClick={() => handleVotoChange(pessoa.id)} style={{ display: `${pessoa.id === voto ? 'radio-label-selecionado' : 'radio-label-nao-selecionado'}`, backgroundColor: 'red' }}>
                                        Anular
                                    </button>
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
                        <strong style={visual}>
                            <strong className='qtd-votos'>
                                  
                                {userLogin.userInfo?.votos}
                                  
                            </strong>
                            {userLogin.userInfo?.votos ?? 0 > 1 ? 'votos' : 'voto'}

                        </strong>

                    </h2>

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
