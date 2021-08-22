import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie'

import { App } from './components/index';
import { Store } from './Store'


ReactDOM.render(
  <React.StrictMode>
    <Store>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

