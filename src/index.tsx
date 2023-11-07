import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container); // Agora garantimos que 'container' não é nulo.
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
} else {
  console.error('Failed to find the root element');
}

reportWebVitals();
