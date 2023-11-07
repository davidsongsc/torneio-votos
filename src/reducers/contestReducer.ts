// usuariosReducer.ts
import { Action } from 'redux';

// Defina a estrutura de cada usuário
interface DadosContest {
  id: number;
  objetivo: string;
  meta: number;
  vendas: number;
  prazo: string;
}

// Defina o tipo de estado para armazenar os usuários
interface ContestState {
  contest: DadosContest[]; // Array de usuários
}

// Estado inicial
const initialState: ContestState = {
  contest: [
    // Coloque seus usuários aqui
    { id: 1, objetivo: 'Vendas Café', meta: 0, vendas: 0, prazo: '10/12' },
   
    // Adicione mais usuários conforme necessário
  ],
};

// Reducer para manipular o estado dos usuários
const contestReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    // Adicione casos para manipular ações relacionadas aos usuários, se necessário
    default:
      return state;
  }
};

export default contestReducer;
