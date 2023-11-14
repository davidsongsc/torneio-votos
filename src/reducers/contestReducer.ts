// usuariosReducer.ts
import { Action } from 'redux';

// Defina a estrutura de cada usuário
interface DadosContest {
  id: number;
  nomeContest: string;
  objetivo: string;
  descricao: string;
  desempenho: number;
  meta: number;
  conquista: number;
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
    { id: 1,nomeContest: 'Café Novembro', objetivo: 'Aumentar venda de Café', descricao: 'O café é uma fonte rica de antioxidantes, substâncias que ajudam a combater os radicais livres no corpo. Os antioxidantes podem contribuir para a prevenção de danos celulares e redução do risco de doenças crônicas.', desempenho: 0, meta: 20, conquista: 0, prazo: '10/12' },
    { id: 2, nomeContest: 'Licor Novembro', objetivo: 'Vendas Licor', descricao: 'Venda de licor.. A maior venda de licor..... teste texto tesla teto toto', desempenho: 0, meta: 7, conquista: 0, prazo: '10/12' },

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
