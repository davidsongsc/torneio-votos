// store.ts

import { createStore, applyMiddleware, Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers'; // Certifique-se de que o caminho para rootReducer está correto
import { RootState } from './reducers'; // Importação do RootState

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Aplica o middleware Redux Thunk
);

// Cria um tipo para o dispatch do Redux que entende thunks
export type AppDispatch = ThunkDispatch<RootState, any, Action>;

export default store;
