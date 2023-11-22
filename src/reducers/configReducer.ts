import { Action } from 'redux';
import { ConfigInfo } from '../actions/userActions';

interface UserState {
  config: ConfigInfo[]; // Array para armazenar todos os usuários buscados
}

const initialState: UserState = {
  config: [
    {
      ver: '1.05b',
      valendo: true,
      unidade: 'bz97',
      prazoManutencao: '2023-11-16T22:50:00',
    },
  ],
};

const configReducer = (
  state = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default configReducer;
