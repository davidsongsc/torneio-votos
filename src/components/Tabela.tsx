import React from 'react';
import { FaBullseye, FaFileAlt, FaSortNumericUp, FaCircleNotch } from 'react-icons/fa';
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
                            <h1>{contest.objetivo}</h1>
                        </div>
                        <div className='linha-contest-tabela'>
                            <div>
                                <h3><FaBullseye />  {contest.nomeContest}</h3>
                                <p className='descricao-contest'> <FaFileAlt />  {contest.descricao}
                                    <p> </p>
                                    <p>inicia em: {contest.data_inicio}</p>
                                    <p>Termina em: {contest.data_fim}</p>
                                    <p>Autor: {contest.autor}</p>
                                    <p> </p>
                                    <h2>Premio</h2>
                                    <p>{contest.premio}</p>
                                </p>
                                <span>
                                    <img className='img-tb-01' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-1'>META </h4>

                                    <img className='img-tb-02' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-2'>ATUAL</h4>
                                </span>
                                <span>
                                    <h4 className='meta-icone'> <FaSortNumericUp size={45} /></h4>
                                    <h4 className='meta-icone'> <FaCircleNotch className='atual-icone' size={45} /></h4>
                                </span>
                                <span>
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
