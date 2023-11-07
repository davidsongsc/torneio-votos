import { VOTAR } from '../actions/types';

// Defina um tipo para a ação de votar
interface VotarAction {
  type: typeof VOTAR;
  payload: number; // O payload é um número, representando o voto selecionado
}

// Defina um tipo para o estado da votação
interface VotoState {
  voto: number | null;
}

const initialState: VotoState = {
  voto: null,
};

const votoReducer = (state = initialState, action: VotarAction) => {
  switch (action.type) {
    case VOTAR:
      return {
        ...state,
        voto: action.payload,
      };
    default:
      return state;
  }
};

export default votoReducer;
