import React from 'react';
import Tabela from './Tabela';
import SectionContest from './SectionContest';

function Main() {
  const secoes = [
    {
      
      h2: 'Novembro',
      div: {
        className: 'custom-div-1',
        children: <p></p>, // Objetivo do Conteste $Variavel
      },
      p: 'OK',
      table: (
        <Tabela />
      ),
    }

  ];

  return (
    <>
      <main className='main-principal-inicio'>
        {secoes.map((section, index) => (
          <SectionContest key={index} content={section} />
        ))}
       
      </main>
    </>
  );
}

export default Main;
