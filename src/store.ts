import { createStore, combineReducers, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import votoReducer from './reducers/votoReducer';


const rootReducer = combineReducers({
  voto: votoReducer,
  
});

export type RootState = ReturnType<typeof rootReducer>;

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
