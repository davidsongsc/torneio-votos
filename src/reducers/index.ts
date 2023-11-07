import { combineReducers } from 'redux';
import algumReducer from './votoReducer'; // Importe seus reducers individuais aqui

const rootReducer = combineReducers({
  algumReducer, // Adicione seus reducers individuais aqui
  // adicione mais reducers se necessário
});

export type RootState = ReturnType<typeof rootReducer>; // Opcional: isso é útil para tipar o estado global da aplicação

export default rootReducer;
