import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore} from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Route path='/' component={App} />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);