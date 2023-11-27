// usuariosReducer.ts
import { ContarVotosAction } from '../actions/userActions';
import * as types from '../actions/types';

// Defina a estrutura de cada usuário
interface DadosContest {
  id: number;
  nomeContest: string;
  texto: string[][];
  desempenho: number;
  meta: number;
  conquista: number;
  data_inicio: string;
  data_fim: string;
  premiacao: string[][];
  autor: string;
  datahora: string;
  status: number;
}

interface ContestState {
  contest: DadosContest[];
}

const initialState: ContestState = {
  contest: [
    {
      id: 1,
      nomeContest: 'Torneio de Votos',
      texto: [['Objetivo:', '\n- Fomentar a interação e colaboração entre os colaboradores.\n- Reconhecer e premiar aqueles que se destacam em nosso ambiente de trabalho.\n- Incentivar a criatividade e a participação ativa.',],
      ['Regras:', 'Votos Bônus: No Final De Cada Torneio, Todos Os Colaboradores Recebem 1 Voto. Caso A Meta Do Torneio Seja Positiva, Todos Recebem 1 Voto Bônus.\nDesafio Cumprido: Se A Meta Do Torneio For Atingida Na Íntegra, Todos Recebem +1 Voto.\nVotação Justa: Uma Pessoa Não Pode Votar Em Si Própria Ou Na Mesma Pessoa.\nInteração: Os Votantes Devem Interagir Entre Si Para Conquistar Os Votos De Seus Colegas.\nPrêmio Mensal: A Pessoa Que Receber Mais Votos No Torneio Do Mês Receberá O Prêmio.\nEmpate: Em Caso De Empate, Um Sorteio Será Realizado Entre Os Empatantes Para Determinar O Vencedor.',],
      ['', '']],
      premiacao: [],
      desempenho: 0,
      meta: 30,
      conquista: 0,
      data_inicio: '01/11/2023',
      data_fim: '-',

      autor: '',
      datahora: '10/12',
      status: 1,
    },
    {
      id: 2,
      nomeContest: 'Nespresso + Sobremesa',
      texto: [['Eu ouvi contest?', 'B`play está com tudo e quer reconhecer os Amici e Outbackers que arrasam nas vendas! Chegamos com um novo desafio e os restaurantes que incrementarem o percentual de Pmix, vão ganhar Blooneys e uma premiação exclusiva da Nespresso!'],
              ['Como vai funcionar?', 'O contest acontecerá entre os dias [13.11.2023] a [14.01.2023] e para premiação estar válida, precisamos atingir a meta BBI de percentual incremental de Pmix. (Nespresso: mínimo 50% de incremento e Sobremesas: mínimo 10% de incremento).'],
              ['A Premiação será dividida em alguns níveis:', 'premio'],],
      premiacao: [['TOP 5 Restaurantes - Vouchers Nespresso (Esperiências).', 'Cenário 1:300 Blooneys | Cenário 2:250 Blooneys | Cenário 3:200 Blooneys '], ['TOP 6 a 10 Restaurantes - Vouchers Nespresso (Esperiências).', 'Cenário 1:300 Blooneys | Cenário 2:250 Blooneys | Cenário 3:200 Blooneys '], ['TOP 11 a 25 Restaurantes - Vouchers Nespresso (Esperiências).', 'Cenário 1:300 Blooneys | Cenário 2:250 Blooneys | Cenário 3:200 Blooneys '],],
      desempenho: 0,
      meta: 0,
      conquista: 0,
      data_inicio: '13/11/2023',
      data_fim: '14/01/2024',

      autor: 'B`play',
      datahora: '10/12',
      status: 1, // suspenso
    },

    // Adicione mais usuários conforme necessário
  ],
};

// Reducer para manipular o estado dos usuários
const contestReducer = (state = initialState, action: ContarVotosAction) => {
  switch (action.type) {
    case types.CONTAR_VOTOS:
      // Verifique se é o contest de ID 1 antes de atualizar a conquista
      if (state.contest && state.contest.length > 0) {
        const contestId1Index = state.contest.findIndex((c) => c.id === 1);

        if (contestId1Index !== -1) {
          return {
            ...state,
            contest: [
              ...state.contest.slice(0, contestId1Index),
              {
                ...state.contest[contestId1Index],
                conquista: action.payload,
              },
              ...state.contest.slice(contestId1Index + 1),
            ],
          };
        }
      }

      return state;
    default:
      return state;
  }
};

export default contestReducer;
