// concretizarVotoReducer.ts

import { CONCRETIZAR_VOTO, CONCRETIZAR_VOTO_INICIO, CONCRETIZAR_VOTO_SUCESSO, CONCRETIZAR_VOTO_FALHA } from '../actions/types';

// Defina um tipo para o estado de concretização do voto
interface ConcretizarVotoState {
  votoConcretizado: boolean;
  votoConfirmadoId: number | null; // Pode ser útil armazenar o ID do voto confirmado
  carregando: boolean;
  erro: string | null;
}

const initialState: ConcretizarVotoState = {
  votoConcretizado: false,
  votoConfirmadoId: null,
  carregando: false,
  erro: null,
};

type Action =
  | { type: typeof CONCRETIZAR_VOTO_INICIO }
  | { type: typeof CONCRETIZAR_VOTO_SUCESSO; payload: number }
  | { type: typeof CONCRETIZAR_VOTO_FALHA; payload: string }
  | { type: typeof CONCRETIZAR_VOTO; payload: number };

const concretizarVotoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case CONCRETIZAR_VOTO_INICIO:
      return {
        ...state,
        carregando: true,
        erro: null,
      };

    case CONCRETIZAR_VOTO_SUCESSO:
      console.log('Votou em ' + action.payload);
      return {
        ...state,
        votoConcretizado: true,
        votoConfirmadoId: action.payload,
        carregando: false,
        erro: null,
      };

    case CONCRETIZAR_VOTO_FALHA:
      return {
        ...state,
        carregando: false,
        erro: action.payload,
      };

    default:
      return state;
  }
};

export default concretizarVotoReducer;
