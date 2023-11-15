// usuariosReducer.ts
import { Action } from 'redux';

// Defina a estrutura de cada usuário
interface DadosContest {
  id: number;
  nomeContest: string;
  tituloInicial: string;
  textoInicial: string;
  stituloInicial: string;
  stextoInicial: string;
  ttituloInicial: string;
  ttextoInicial: string;
  objetivo: string;
  descricao: string;
  desempenho: number;
  meta: number;
  conquista: number;
  data_inicio: string;
  data_fim: string;
  premiacao1: string[];
  premiacao2: string[];
  premiacao3: string[];
  autor: string;
  datahora: string;
  status: number;

}

// Defina o tipo de estado para armazenar os usuários
interface ContestState {
  contest: DadosContest[]; // Array de usuários
}

// Estado inicial
const initialState: ContestState = {
  contest: [
    // Coloque seus usuários aqui
    {
      id: 2,
      nomeContest: 'Nespresso + Sobremesa',
      tituloInicial: 'Eu ouvi contest?',
      textoInicial: 'B`play está com tudo e quer reconhecer os Amici e Outbackers que arrasam nas vendas! Chegamos com um novo desafio e os restaurantes que incrementarem o percentual de Pmix, vão ganhar Blooneys e uma premiação exclusiva da Nespresso!',
      stituloInicial: 'Como vai funcionar?',
      stextoInicial: 'O contest acontecerá entre os dias [13.11.2023] a [14.01.2023] e para premiação estar válida, precisamos atingir a meta BBI de percentual incremental de Pmix. (Nespresso: mínimo 50% de incremento e Sobremesas: mínimo 10% de incremento).',
      objetivo: 'Como vai funcionar?',
      ttituloInicial: 'A Premiação será dividida em alguns níveis:',
      ttextoInicial: '',
      premiacao1: ['TOP 5 Restaurantes - Vouchers Nespresso (Esperiências).', 'Cenário 1:300 Blooneys | Cenário 2:250 Blooneys | Cenário 3:200 Blooneys '],
      premiacao2: ['TOP 6 a 10 Restaurantes - Vouchers Nespresso (Esperiências).', 'Cenário 1:300 Blooneys | Cenário 2:250 Blooneys | Cenário 3:200 Blooneys '],
      premiacao3: ['TOP 11 a 25 Restaurantes - Vouchers Nespresso (Esperiências).', 'Cenário 1:300 Blooneys | Cenário 2:250 Blooneys | Cenário 3:200 Blooneys '],
      descricao: 'O contest acontecerá entre os dias 13.11 a 14.01 e para premiação estar válida, precisamos atingir a meta BBI de percentual incremental de Pmix. (Nespresso: Minimo 50% de incremento e Sobremesas: mínimo 10% de incremento.',
      desempenho: 0,
      meta: 20,
      conquista: 0,
      data_inicio: '10/12',
      data_fim: '10/12',

      autor: 'ciclano',
      datahora: '10/12',
      status: 0,
    },
    
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
