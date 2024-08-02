import { Route, Routes, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from "./Components/Header/Header";

const Home = lazy(() => import("../src/Pages/Home/Home"));
const Employees = lazy(() => import("../src/Pages/Employees/Employees"));
const Error = lazy(() => import("../src/Pages/Error/Error"));

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isErrorPage = location.pathname === '/error';

  return (
    <>
      {!isErrorPage && <Header />}
      {children}
    </>
  );
};

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/employees" element={<MainLayout><Employees /></MainLayout>} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Suspense>
);

export default App;

