import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './redux/rootReducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));

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

