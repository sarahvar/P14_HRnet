import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../src/Components/Header/Header';
import Home from '../src/Pages/Home/Home';
import './App.css';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  </>
);

export default App;
