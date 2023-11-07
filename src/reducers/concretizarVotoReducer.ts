// concretizarVotoReducer.js

import { CONCRETIZAR_VOTO } from '../actions/types';

// Defina um tipo para a ação de concretizar o voto
interface ConcretizarVotoAction {
  type: typeof CONCRETIZAR_VOTO;
  payload: number; // O payload pode conter informações adicionais, se necessário
}

// Defina um tipo para o estado de concretização do voto
interface ConcretizarVotoState {
  votoConcretizado: boolean;
  votoConfirmadoId: number | null; // Pode ser útil armazenar o ID do voto confirmado
}

const initialState: ConcretizarVotoState = {
  votoConcretizado: false,
  votoConfirmadoId: null,
};

const concretizarVotoReducer = (state = initialState, action: ConcretizarVotoAction) => {
    
  switch (action.type) {
    
    case CONCRETIZAR_VOTO:
    console.log('votou em ' + action.payload)
      return {
        ...state,
        votoConcretizado: true,
        votoConfirmadoId: action.payload, // Pode ser definido com base no payload da ação
      };
      
    default:
      return state;
  }
  
};

export default concretizarVotoReducer;
