import React from 'react';
import Section from './Section';
import Aside from './Aside';
import Tabela from './Tabela';
import Ranking from './Ranking';
import RankingGeral from './RankingGeral';
import Votar from './Votar';

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
    },
    {
      h2: 'Votar',
      p: '',
      Votar: (
        Votar 
      ),
    },
    {
      h2: 'Ranking',
      p: '',
      table: (
        <Ranking />
      ),
    },
    {
      h2: 'Histórico',
      p: 'Este componente mostra o histórico de votos de todos os participantes.',
    },
  ];

  const noticias = [
    {
      h2: 'Todos',
      p: '',
      table: (
        <RankingGeral />
      ),
    },

  ];

  return (
    <>
      <main className='main-principal-inicio'>
        {secoes.map((section, index) => (
          <Section key={index} content={section} />
        ))}
        {noticias.map((section, index) => (
          <Aside key={index} content={section} />
        ))}
      </main>
    </>
  );
}

export default Main;
