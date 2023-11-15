import React, { useState } from 'react';
import { FaBullseye, FaFileAlt, FaSortNumericUp, FaCircleNotch, FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';
import { FaParagraph, FaEdit, FaPen, FaAlignLeft,FaHistory  , FaMedal,FaCalendarAlt , FaTrophy, FaAward, FaList, FaStar } from 'react-icons/fa';

const Tabela: React.FC = () => {
    const data = useSelector((state: RootState) => state.contestReducer.contest);
    const usuario = useSelector((state: RootState) => state.userReducer.userInfo?.nome);
    const alcunhaArray = useSelector((state: RootState) => state.userReducer.userInfo?.alcunha?.split(','));
    const [selectedDate, setSelectedDate] = useState<string>('');
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleAutoFill = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
    };

    return (
        <>
            <section className='contest-tabela' style={{ display: `none` }}>
                <div className='titulo-barra-contest'>
                    <input type="text" placeholder='Titulo Contest' />
                    <FaArrowAltCircleDown color='brown' /> <FaArrowAltCircleUp color='green' />
                </div>
                <div className='linha-contest-tabela' style={{ filter: 'grayscale(100%)' }}>
                    <div className='descr' >
                        <FaBullseye />  <textarea name="texto" placeholder='Descrição' style={{
                            height: '26px',
                            marginTop: '3px',
                            width: '262px',
                            fontSize: 'xx-small',
                            backgroundColor: '#2f4f4f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0px'
                        }} />
                        <p className='descricao-contest' style={{ height: '343px' }}> <FaFileAlt />
                            <textarea name="texto" placeholder='Descrição' style={{
                                height: '56px',
                                marginTop: '3px',
                                width: '230px',
                                fontSize: 'xx-small',
                                backgroundColor: '#2f4f4f',
                                color: 'white',
                                border: 'none'
                            }} />

                            <h3>Prazo:</h3>
                            <p>
                                <label htmlFor="data">De  </label>
                                <input
                                    type="date"
                                    id="data"
                                    name="data"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                                <button type="button" onClick={handleAutoFill}>
                                    Hoje
                                </button>
                                <br />
                            </p>

                            <p>Até <input
                                type="date"
                                id="data"
                                name="data"
                                value={selectedDate}
                                onChange={handleDateChange}
                            /></p>
                            <h3>autor</h3>
                            <p >{alcunhaArray?.[0]?.trim()}: {usuario}</p>
                            <p> </p>
                            <h2>Premiação</h2>
                            <p>Premio</p>
                        </p>

                    </div>
                </div>
            </section>
            {
                data.slice(0, 17).map((contest, index) => (
                    <section key={index} className='contest-tabela' style={{ filter: `${contest.status > 0 ? 'blur(1px)' : ''}` }}>
                        <div className='titulo-barra-contest' style={{ fontSize: '14px' }}>
                            <h1><FaList /> {contest.nomeContest} {contest.status === 0 ? <></> : contest.status === 1 ? <FaArrowAltCircleDown color='brown' /> : <FaArrowAltCircleUp color='green' />} </h1>

                        </div>
                        <div className='linha-contest-tabela' style={{ filter: `${contest.status > 0 ? 'grayscale(100%)' : ''}` }}>
                            <div >
                                <h2 style={{
                                    fontSize: '13px',
                                    borderRadius: '0px',
                                    filter: `${contest.status === 1 ? 'blur(0px) grayscale(0)' : ''}`
                                }}><FaBullseye />  {contest.tituloInicial}</h2>
                                <p style={{
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    padding: '10px',
                                    borderRadius: '0px',
                                    lineHeight: '13px',
                                    filter: `${contest.status === 1 ? 'blur(0px) grayscale(0)' : ''}`
                                }}><FaPen />  {contest.textoInicial}</p>
                                <FaParagraph />
                                <h2 style={{
                                    fontSize: '13px',
                                    borderRadius: '0px',
                                    filter: `${contest.status === 1 ? 'blur(0px) grayscale(0)' : ''}`
                                }}><FaEdit />  {contest.stituloInicial}</h2>
                                <p style={{
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    padding: '10px',
                                    borderRadius: '0px',
                                    lineHeight: '13px',
                                    filter: `${contest.status === 1 ? 'blur(0px) grayscale(0)' : ''}`
                                }}><FaAlignLeft />
                                    {contest.stextoInicial}</p>
                                    <FaParagraph />
                                <h2 style={{
                                    fontSize: '13px',
                                    borderRadius: '0px',
                                    filter: `${contest.status === 1 ? 'blur(0px) grayscale(0)' : ''}`
                                }}><FaTrophy />  {contest.ttituloInicial}</h2>
                                <p style={{
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    padding: '10px',
                                    borderRadius: '0px',
                                    lineHeight: '13px',
                                    filter: `${contest.status === 1 ? 'blur(0px) grayscale(0)' : ''}`
                                }}>{contest.ttextoInicial}
                                    <p>
                                        <FaAward />
                                        {contest.premiacao1}
                                    </p>
                                    <p>
                                        <FaMedal />
                                        {contest.premiacao2}
                                    </p>
                                    <p>
                                        <FaStar />
                                        {contest.premiacao3}
                                    </p>
                                </p>
                                
                                <p className='descricao-contest' style={{ filter: `${contest.status > 0 ? 'blur(0px)' : ''}` }}> 
                                    <p> </p>
                                    <p style={{ filter: `${contest.status === 1 ? 'blur(3px)' : ''}` }}><FaCalendarAlt  />   inicia : {contest.data_inicio}</p>
                                    <p style={{ filter: `${contest.status === 1 ? 'blur(8px)' : ''}` }}><FaCalendarAlt  />  Termina : {contest.data_fim}</p>
                                    <p style={{ filter: `${contest.status === 1 ? 'blur(8px)' : ''}` }}><FaHistory   />   Autor: {contest.autor}</p>
                                    <p> </p>

                                </p>
                                <span style={{ filter: `${contest.status > 0 ? 'blur(8px)' : ''}` }}>
                                    <img className='img-tb-01' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-1'>META </h4>

                                    <img className='img-tb-02' src="https://static.vecteezy.com/system/resources/previews/012/933/205/original/kingdom-red-flag-free-png.png" alt="img" />
                                    <h4 className='titulo-2'>ATUAL</h4>
                                </span>
                                <span style={{ filter: `${contest.status > 0 ? 'blur(7px)' : ''}` }}>
                                    <h4 className='meta-icone'> <FaSortNumericUp size={45} /></h4>
                                    <h4 className='meta-icone'> <FaCircleNotch className='atual-icone' size={45} /></h4>
                                </span>
                                <span style={{ filter: `${contest.status > 0 ? 'blur(10px)' : ''}` }}>
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
