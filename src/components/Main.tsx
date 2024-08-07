import React from 'react';
import Tabela from './ContestTabela';
import SectionContest from './Contest';

function Main() {
  const secoes = [
    {
      
      h2: '',
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
        <h1></h1>
        {secoes.map((section, index) => (
          <SectionContest key={index} content={section} />
        ))}
       
      </main>
    </>
  );
}

export default Main;
