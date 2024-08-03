import { Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from "./Components/Header/Header";

const Home = lazy(() => import("../src/Pages/Home/Home"));
const Employees = lazy(() => import("../src/Pages/Employees/Employees"));
const Error = lazy(() => import("../src/Pages/Error/Error"));

const App = () => (
  <>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  </>
);

export default App;

