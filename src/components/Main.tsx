import React from 'react';
import Tabela from './Tabela';
import SectionContest from './SectionContest';

function Main() {
  const secoes = [
    {
      
      h2: 'Contest',
      div: {
        className: 'custom-div-1',
        children: <p></p>, // Objetivo do Conteste $Variavel
      },
      p: '',
      table: (
        <Tabela />
      ),
    }

  ];

  return (
    <>
      <main className='main-principal-inicio'  style={{width: '100%'}}>
        {secoes.map((section, index) => (
          <SectionContest key={index} content={section} />
        ))}
       
      </main>
    </>
  );
}

export default Main;
