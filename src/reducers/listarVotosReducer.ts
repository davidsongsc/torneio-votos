import { ListaVotos } from '../actions/userActions';
import { Action } from 'redux';
import * as types from '../actions/types';

interface FetchListarVotosAction extends Action {
  type: typeof types.FETCH_LISTAR_VOTOS;
  payload: ListaVotos[]; 
}

interface UserState {
  listaVotos: ListaVotos[];
}

const initialState: UserState = {
  listaVotos: [],
};

const listarVotosReducer = (
  state = initialState,
  action: FetchListarVotosAction 
): UserState => {
  switch (action.type) {
    case types.FETCH_LISTAR_VOTOS:
      return {
        ...state,
        listaVotos: action.payload || [], 
      };
    default:
      return state;
  }
};

export default listarVotosReducer;
