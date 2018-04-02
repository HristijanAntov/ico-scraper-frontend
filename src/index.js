import React from 'react';
import { ConnectedRouter } from 'react-router-redux'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store, { history } from './store'
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
