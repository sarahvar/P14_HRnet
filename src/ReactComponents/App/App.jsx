import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';
"import Employees from '../pages/Employees/Employees';"
"import Error from '../pages/Error/Error';"
import './App.css';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route index element={<Home />} />
      <Route path="employees" element={<Employees />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </>
);

export default App;
