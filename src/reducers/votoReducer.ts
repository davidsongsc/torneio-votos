import { VOTAR } from '../actions/types';

interface VotoState {
  voto: number | null;
}

const initialState: VotoState = {
  voto: null,
};

const votoReducer = (state = initialState, action: any) => {
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
