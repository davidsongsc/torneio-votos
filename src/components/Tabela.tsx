import React from 'react';
import { FaBullseye, FaFileAlt, FaSortNumericUp, FaCircleNotch   } from 'react-icons/fa';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';

const Tabela: React.FC = () => {
    const data = useSelector((state: RootState) => state.contestReducer.contest);

    return (
        <>
            {
                data.slice(0, 17).map((contest, index) => (
                    <section key={index} className='contest-tabela'>
                        <div className='titulo-barra-contest'>
                            <h1>{contest.nomeContest}</h1>
                        </div>
                        <div className='linha-contest-tabela'>
                            <div>
                                <h3><FaBullseye />Objetivo</h3>
                                <p><FaFileAlt /> {contest.objetivo}</p>
                                <span>
                                    <img className='img-tb-01' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-1'>META </h4>

                                    <img className='img-tb-02' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-2'>ATUAL</h4>
                                </span>
                                <span>
                                    <p> <FaSortNumericUp  size={45} /></p>
                                    <p> <FaCircleNotch  className='atual-icone' size={45} /></p>
                                </span>
                                <span>
                                    <p className='meta-atual'>{contest.meta} </p>
                                    <p className='meta-atual'>{contest.conquista} </p>
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
