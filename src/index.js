import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import './index.css';

const rootElement = document.getElementById('root');

const createRoot = ReactDOM.createRoot(rootElement);
createRoot.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
