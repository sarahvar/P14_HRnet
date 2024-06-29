import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../src/Components/Header/Header';
import Home from '../src/Pages/Home/Home';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css'; 

library.add(fas);


const App = () => (
  <>
    <Header />
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  </>
);

export default App;
