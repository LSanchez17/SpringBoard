import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistedStore} from './store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <BrowserRouter>
        <React.StrictMode>
          <Route path='/' component={App} />
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

