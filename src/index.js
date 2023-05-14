import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './components/Signup/signup'
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard/>
  </React.StrictMode>
);

