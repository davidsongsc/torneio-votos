import React from 'react';
import Section from './Section';
import Votar from './Votar';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';


function MainVoto() {
  const userLogin = useSelector((state: RootState) => state.userReducer);
  const { isLoggedIn } = userLogin;
  const secoes = [

    {
      h2: 'Votos Disponiveis',
      p: '',
      Votar: (
        Votar
      ),
    },

  ];

  return (
    <>
      <main className='main-principal-inicio' style={{ display: `${!isLoggedIn ? 'none' : ''}`}}>
        {secoes.map((section, index) => (
          <Section key={index} content={section} />
        ))}

      </main>
    </>
  );
}

export default MainVoto;
