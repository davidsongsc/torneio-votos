import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Importe o Provider do react-redux
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crie uma instância do store
import store from './store'; // Importe a instância configurada do seu store

// Renderize o aplicativo dentro do Provider
ReactDOM.render(
  <Provider store={store}> {/* Aqui você envolve seu aplicativo com o Provider e passa o store como prop */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root') as HTMLElement
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
