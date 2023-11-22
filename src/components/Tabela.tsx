import React, { useEffect } from 'react';
import { FaBullseye, FaSortNumericUp, FaCircleNotch, FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';
import { FaEdit, FaHistory, FaMedal, FaCalendarAlt, FaTrophy, FaAward, FaList } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchListarVotos } from '../actions/userActions';
import { contarVotos } from '../actions/userActions';

const Tabela: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.contestReducer.contest);
    const listaVotos = useSelector((state: RootState) => state.listarVotosReducer.listaVotos);
    const tamanhoIconeContestText = 20;
    const contestAtivo = 1;

    useEffect(() => {
        // Dispatch da ação para buscar os dados quando o componente montar
        dispatch(fetchListarVotos() as any); // Adicione "as any" temporariamente para evitar erro de tipo
        dispatch(contarVotos(listaVotos.length));

    }, [dispatch]);


    

    return (
        <>

            {
                data.slice(0, 17).map((contest, index) => (
                    <section key={index} className={`contest-tabela ${contest.status === 1 ? '' : 'contest-inativ'}`}>
                        <div className='titulo-barra-contest' style={{ fontSize: '14px' }}>
                            <h1>
                                <FaList /> <input type="text" value={contest.nomeContest} placeholder='Titulo Contest' /> {contest.status === 0 ? <></> : contest.status !== contestAtivo ? <FaArrowAltCircleDown color='brown' /> : <FaArrowAltCircleUp color='green' />}
                            </h1>
                        </div>
                        <div className='linha-contest-tabela' >
                            <div className='linha-tabela-mor'>
                                <div className='icone-area-context-texto'>
                                    <FaBullseye />
                                </div>
                                <textarea className='titulo-area-contest-t1' name="texto" value={contest.tituloInicial} placeholder='Descrição' />
                                <p style={{
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    padding: '10px',
                                    borderRadius: '0px',
                                    lineHeight: '13px',

                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '185px',
                                        zIndex: '300',
                                        left: '50px',
                                        backgroundColor: '#ffffff7a',
                                        width: `${tamanhoIconeContestText * 2}px`,
                                        borderRadius: '5px'
                                    }}>
                                        <FaMedal size={tamanhoIconeContestText} />
                                    </div>  <textarea className='text-area-contest-t1' name="texto" value={contest.textoInicial}> </textarea></p>

                                <div className='icone-area-context-texto'><FaEdit />   </div> <textarea className='titulo-area-contest-t1' name="texto" value={contest.stituloInicial} placeholder='Descrição' />

                                <div className='icone-area-context-texto'>
                                </div>
                                <textarea className='text-area-contest-t2' name="texto" value={contest.stextoInicial} placeholder='Descrição' />


                                <div className='text-area-contest-div'>
                                    <h2 style={{
                                        fontSize: '13px',
                                        borderRadius: '0px',
                                    }}>

                                        <FaTrophy />  {contest.ttituloInicial}</h2>
                                    {contest.premiacao.map((premiacao, index) => (
                                        <p key={index} className='texto-contest-test'>

                                            <h3>  {index + 1}ª Premiação <FaAward size={tamanhoIconeContestText} />:</h3>
                                            <ul>
                                                {premiacao.map((detalhe, detalheIndex) => (
                                                    <li key={detalheIndex}>{detalhe}</li>
                                                ))}
                                            </ul>

                                        </p>
                                    ))}
                                </div>


                                <p className='descricao-contest'>
                                    <p> </p>
                                    <p><FaCalendarAlt />inicio : {contest.data_inicio}</p>
                                    <p><FaCalendarAlt />fim : {contest.data_fim}</p>
                                    <p><FaHistory />Autor: {contest.autor}</p>
                                    <p> </p>

                                </p>
                                <span >
                                    <img className='img-tb-01' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-1'>META </h4>

                                    <img className='img-tb-02' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-2'>ATUAL</h4>
                                </span>
                                <span >
                                    <h4 className='meta-icone'> <FaSortNumericUp size={45} /></h4>
                                    <h4 className='meta-icone'> <FaCircleNotch className='atual-icone' size={45} /></h4>
                                </span>
                                <span>
                                    <h4 className='meta-atual'>{contest.meta} </h4>
                                    <h4 className='meta-atual'>{contest.conquista} </h4>
                                </span>
                            </div>
                        </div>
                    </section >
                ))
            }

        </>
    );
};

export default Tabela;
