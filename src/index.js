import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './components/Signup/signup'
import Login from './components/Login/login';
import Dashboardpharmacy from './components/Dashboard/dashboardpharmacy';
import Dashboardbloodbank from './components/Dashboard/dashboardbloodbank';
import Dashboarddoctor from './components/Dashboard/dashboarddoctor';
import Dashboardhospital from './components/Dashboard/dashboardhospital';
import Alert from './components/Alert/alert';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboarddoctor/>
  </React.StrictMode>
);

