import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Store } from './Store'


ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

