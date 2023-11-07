import React from 'react';
import Section from './pagina/Section';
import Ranking from './pagina/Ranking';


function PageRanking() {
  const secoes = [
    {
      h2: 'Ranking',
      p: '',
      table: (
        <Ranking />
      ),
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

export default PageRanking;
