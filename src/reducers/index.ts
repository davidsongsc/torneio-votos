import { combineReducers } from 'redux';
import votarReducer from './votoReducer'; // Importe seus reducers individuais aqui
import concretizarVotoReducer from './concretizarVotoReducer';
import usuariosReducer from './usuariosReducer'; // Importe o novo reducer de usuários
import contestReducer from './contestReducer'; // Importe o novo reducer de usuários


const rootReducer = combineReducers({
  votarReducer, // Adicione seus reducers individuais aqui
  concretizarVotoReducer: concretizarVotoReducer, // Adicione o novo reducer aqui
  usuariosReducer,
  contestReducer,
  // adicione mais reducers se necessário
});

export type RootState = ReturnType<typeof rootReducer>; // Opcional: isso é útil para tipar o estado global da aplicação

export default rootReducer;
