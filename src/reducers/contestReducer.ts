import { ContarVotosAction, ContestDadosAction, DadosContest } from '../actions/userActions';
import * as types from '../actions/types';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState } from '.';



interface ContestState {
  contest: DadosContest[];
}


const initialState: ContestState = {
  contest: [

  ],
};

export const carregarContests = (): ThunkAction<void, RootState, unknown, ContestDadosAction> => {
  return async (dispatch: Dispatch<ContestDadosAction>) => {
    try {
      // Simule uma requisição à API (substitua pelo código real)
      const response = await fetch(types.API_CONTEST);
      const data = await response.json();

      // Dispare uma ação para atualizar o estado com os dados da API
      dispatch({
        type: types.CARREGAR_CONTESTS,
        payload: data,
      });
    } catch (error) {
      console.error('Erro ao carregar contests:', error);
    }
  };
};


const contestReducer = (state = initialState, action: ContarVotosAction | ContestDadosAction) => {
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

    case types.CARREGAR_CONTESTS:
      return {
        ...state,
        contest: action.payload,
      };

    default:
      return state;
  }
};

export default contestReducer;
