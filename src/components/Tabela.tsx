import React from 'react';
import { FaBullseye, FaFileAlt, FaSortNumericUp, FaCircleNotch, FaArrowAltCircleUp,FaArrowAltCircleDown  } from 'react-icons/fa';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';

const Tabela: React.FC = () => {
    const data = useSelector((state: RootState) => state.contestReducer.contest);

    return (
        <>
            {
                data.slice(0, 17).map((contest, index) => (
                    <section key={index} className='contest-tabela' style={{filter:`${contest.status > 0?  'blur(1px)': ''}` }}>
                        <div className='titulo-barra-contest'>
                            <h1>{contest.objetivo} {contest.status === 0 ? <></> : contest.status === 1 ? <FaArrowAltCircleDown color='brown'/> : <FaArrowAltCircleUp color='green' />} </h1>
                           
                        </div>
                        <div className='linha-contest-tabela'   style={{filter:`${contest.status > 0?  'grayscale(100%)': ''}` }}>
                            <div >
                                <h3 style={{filter:`${contest.status === 1?  'blur(0px) grayscale(0)': ''}` }}><FaBullseye />  {contest.nomeContest}</h3>
                                <p className='descricao-contest' style={{filter:`${contest.status > 0?  'blur(0px)': ''}` }}> <FaFileAlt />  {contest.descricao}
                                    <p> </p>
                                    <p style={{filter:`${contest.status === 1?  'blur(3px)': ''}` }}>inicia em: {contest.data_inicio}</p>
                                    <p style={{filter:`${contest.status === 1?  'blur(8px)': ''}` }}>Termina em: {contest.data_fim}</p>
                                    <p style={{filter:`${contest.status === 1?  'blur(8px)': ''}` }}>Autor: {contest.autor}</p>
                                    <p> </p>
                                    <h2 style={{filter:`${contest.status === 1?  'blur(8px)': ''}` }}>Premio</h2>
                                    <p style={{filter:`${contest.status === 1?  'blur(8px)': ''}` }}>{contest.premio}</p>
                                </p>
                                <span style={{filter:`${contest.status > 0?  'blur(8px)': ''}` }}>
                                    <img className='img-tb-01' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-1'>META </h4>

                                    <img className='img-tb-02' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-2'>ATUAL</h4>
                                </span>
                                <span style={{filter:`${contest.status > 0?  'blur(7px)': ''}` }}>
                                    <h4 className='meta-icone'> <FaSortNumericUp size={45} /></h4>
                                    <h4 className='meta-icone'> <FaCircleNotch className='atual-icone' size={45} /></h4>
                                </span>
                                <span style={{filter:`${contest.status > 0?  'blur(10px)': ''}` }}>
                                    <h4 className='meta-atual'>{contest.meta} </h4>
                                    <h4 className='meta-atual'>{contest.conquista} </h4>
                                </span>
                            </div>
                        </div>
                    </section>
                ))
            }

        </>
    );
};

export default Tabela;
