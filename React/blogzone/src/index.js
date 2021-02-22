import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './redux/rootReducer';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
