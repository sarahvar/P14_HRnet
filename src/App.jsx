import { Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from "./Components/Header/Header"; 

const Home = lazy(() => import("../src/Pages/Home/Home"));
const Employees = lazy(() => import("../src/Pages/Employees/Employees"));

const App = () => (
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Suspense>
  </>
);

export default App;

