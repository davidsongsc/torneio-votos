import { createStore, combineReducers, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import votoReducer from './reducers/votoReducer';
import usuariosReducer from './reducers/usuariosReducer'; // Importe seu UsuariosReducer
import contestReducer  from './reducers/contestReducer'; // Importe seu UsuariosReducer

const rootReducer = combineReducers({
  votoReducer: votoReducer,
  usuariosReducer: usuariosReducer,
  contestReducer: contestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
