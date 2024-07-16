import { Action } from 'redux';
import { ConfigInfo } from '../actions/userActions';

interface UserState {
  config: ConfigInfo[]; // Array para armazenar todos os usuários buscados
}

const initialState: UserState = {
  config: [
    {
      ver: '1.07a',
      serial: '061816072024',
      valendo: false,
      unidade: 'Escritório',
      prazoManutencao: '2024-10-01T22:50:00',
      prazoTeste: '2023-11-10T22:50:00',
      webpage: '',
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
