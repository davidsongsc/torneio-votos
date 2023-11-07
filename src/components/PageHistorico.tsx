import React from 'react';
import Section from './pagina/Section';

function PageHistorico() {
  const secoes = [
    {
      h2: 'Histórico',
      p: 'Este componente mostra o histórico de votos de todos os participantes.',
    },
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

export default PageHistorico;
