import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Insert from './components/insert/Insert';

ReactDOM.render(
  <React.StrictMode>
    <Insert/>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
