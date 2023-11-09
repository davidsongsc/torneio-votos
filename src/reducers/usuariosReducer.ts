// usuariosReducer.ts
import { Action } from 'redux';

// Importe os tipos de ação definidos anteriormente
import { UserData } from '../actions/userActions';

interface UserState {
    usuarios: UserData[]; // Array para armazenar todos os usuários buscados

}

const initialState: UserState = {
    usuarios: [],

};

// Reducer para manipular o estado dos usuários
const usuariosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    // Adicione casos para manipular ações relacionadas aos usuários, se necessário
    default:
      return state;
  }
};

export default usuariosReducer;
