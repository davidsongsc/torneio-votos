import { Action } from 'redux';
import { ConfigInfo } from '../actions/userActions';

interface UserState {
  config: ConfigInfo[]; // Array para armazenar todos os usuários buscados
}

const initialState: UserState = {
  config: [
    {
      ver: '1.03g',
      valendo: false,
      unidade: 'bz97',
    },
  ],
};

const configReducer = (
  state = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    // Adicione casos para manipular ações relacionadas aos usuários, se necessário
    default:
      return state;
  }
};

export default configReducer;