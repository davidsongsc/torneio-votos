import React, { useEffect, useState } from 'react';
import { FaBullseye, FaSortNumericUp, FaCircleNotch, FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import {
    IoIosMedal,
    // IoMdTrophy,
    // IoMdRibbon,
    // IoMdStar,
    // IoMdStarOutline,
} from 'react-icons/io';
import { RootState } from '../reducers';
import { useSelector } from 'react-redux';
import { FaEdit, FaHistory, FaMedal, FaCalendarAlt, FaTrophy, FaAward, FaList } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchListarVotos } from '../actions/userActions';
import { contarVotos } from '../actions/userActions';
import { carregarContests } from '../reducers/contestReducer';
interface ContestSection {
    isClicado: boolean;
}

const Tabela: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.contestReducer);
    const listaVotos = useSelector((state: RootState) => state.listarVotosReducer.listaVotos);
    const [sectionStates, setSectionStates] = useState<ContestSection[]>(
        Array(data.contest?.length || 0).fill({ isClicado: false })
    );
    console.log(data);
    const tamanhoIconeContestText = 20;
    const contestAtivo = 1;

    const handleClick = (index: number) => {
        // Cria uma cópia do array de estados
        const newSectionStates = [...sectionStates];
        // Inicializa o elemento se for undefined
        newSectionStates[index] = Object.assign({}, newSectionStates[index], { isClicado: !newSectionStates[index]?.isClicado });
        // Atualiza o estado
        setSectionStates(newSectionStates);
    };

    useEffect(() => {
        console.log('Dispatching carregarContests...');
        dispatch(carregarContests() as any);

        console.log('Dispatching fetchListarVotos...');
        dispatch(fetchListarVotos() as any);

        console.log('Dispatching contarVotos...');
        dispatch(contarVotos(listaVotos.length));

    }, [dispatch]);

    return (
        <>

            {
                data.contest?.slice(0, 17).map((contest, index) => (
                    <section key={index} className={`contest-tabela ${contest.status === 1 ? '' : 'contest-inativ'}`}>
                        <div className='titulo-barra-contest' onClick={() => handleClick(index)} style={{ fontSize: '14px' }}>
                            <h1>
                                <FaList /> <input type="text" value={contest.nomeContest} placeholder='Titulo Contest' />
                                {contest.status === 0 ?
                                    <></>
                                    :
                                    contest.status !== contestAtivo ?
                                        <FaArrowAltCircleDown color='brown' />
                                        :
                                        <FaArrowAltCircleUp color='green' />}
                            </h1>

                        </div>

                        <p className='descricao-contest' onClick={() => handleClick(index)} style={{ fontSize: '14px' }}>
                            <p><FaCalendarAlt />inicio : {contest.data_inicio}</p>
                            <br />
                            <p><FaCalendarAlt />fim : {contest.data_fim}</p>
                            <br />
                            <p ><FaHistory />Autor: {contest.autor}</p>
                        </p>

                        <div className='linha-contest-tabela' style={{ display: `${sectionStates[index]?.isClicado ? 'block' : 'none'}` }}>

                            <div className='linha-tabela-mor'>
                                {contest.texto?.map((secao, secaoIndex) => (
                                    <React.Fragment key={secaoIndex}>
                                        <div className='icone-area-context-texto'>
                                            <FaBullseye size={tamanhoIconeContestText} >
                                                {secao[secaoIndex]?.titulo}</FaBullseye>
                                        </div>

                                        <span className='titulo-area-contest-t1'>
                                            {secao[0]?.titulo}
                                        </span>
                                        <span className='text-area-contest-t1'>
                                            {secao[0]?.texto}
                                        </span>


                                    </React.Fragment>
                                ))}

                               
                                <div className='text-area-contest-div'>
                                    <h2 style={{
                                        fontSize: '13px',
                                        borderRadius: '0px',
                                    }}>
                                        <FaTrophy /> 
                                    </h2>
                                    {contest.premiacao?.map((premiacao, index) => (
                                        <p key={index} className='texto-contest-test'>
                                            <ul>
                                                {premiacao.map((detalhe, detalheIndex) => (
                                                    <li key={detalheIndex}>{index + 1}ª {detalhe.titulo}</li>
                                                ))}
                                            </ul>
                                        </p>
                                    ))}
                                </div>


                            </div>
                        </div>
                    </section >
                ))
            }

        </>
    );
};

export default Tabela;
