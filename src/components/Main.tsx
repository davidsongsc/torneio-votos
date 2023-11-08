import React from 'react';
import Section from './Section';
import Tabela from './Tabela';

function Main() {
  const secoes = [
    {
      
      h2: 'Contest',
      div: {
        className: 'custom-div-1',
        children: <p>Venda de Café</p>, // Objetivo do Conteste $Variavel
      },
      p: '',
      table: (
        <Tabela />
      ),
    }

  ];

  return (
    <>
      <main className='main-principal-inicio'>
        {secoes.map((section, index) => (
          <Section key={index} content={section} />
        ))}
       
      </main>
    </>
  );
}

export default Main;
