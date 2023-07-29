import React from 'react';
import Home from './components/Home/home'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import Signup from './components/Signup/signup'
import Login from './components/Login/login';
import Dashboardpharmacy from './components/Dashboard/dashboardpharmacy';
import Dashboardbloodbank from './components/Dashboard/dashboardbloodbank';
import Dashboarddoctor from './components/Dashboard/dashboarddoctor';
import Dashboardhospital from './components/Dashboard/dashboardhospital';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/bloodbank" element={<Dashboardbloodbank/>} />
        <Route path="/doctor" element={<Dashboarddoctor/>} />
        <Route path="/pharmacy" element={<Dashboardpharmacy/>} />
        <Route path="/hospital" element={<Dashboardhospital/>} />
      </Routes>
    </Router>
    

    






    </>
  );
}

export default App;
