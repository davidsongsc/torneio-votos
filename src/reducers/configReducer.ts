import { Action } from 'redux';
import { ConfigInfo } from '../actions/userActions';

interface UserState {
  config: ConfigInfo[]; // Array para armazenar todos os usuários buscados
}

const initialState: UserState = {
  config: [
    {
      ver: '1.06i',
      serial: '180028112023',
      valendo: false,
      unidade: 'bz97',
      prazoManutencao: '2023-12-10T22:50:00',
      prazoTeste: '2023-11-10T22:50:00',
      webpage: 'https://bz97.vercel.app/',
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
