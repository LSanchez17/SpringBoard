import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Route path='/' component={App} />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

