import concretizarVotoReducer from './concretizarVotoReducer';
import userReducer  from '../reducers/userReducer';
import usuariosReducer from './usuariosReducer'; 
import contestReducer from './contestReducer'; 
import { combineReducers } from 'redux';
import votoReducer from './votoReducer';

const rootReducer = combineReducers({
  concretizarVotoReducer: concretizarVotoReducer,
  userReducer: userReducer,
  user: userReducer,
  usuariosReducer,
  contestReducer,
  votoReducer,  
});

export type RootState = ReturnType<typeof rootReducer>; 

export default rootReducer;
