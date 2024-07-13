import { Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Header from '../src/Components/Header/Header';
import './App.css'; 



const Home = lazy(() => import("../src/Pages/Home/Home"));

const App = () => (
  <>
   <Suspense fallback={<div>Loading...</div>}>
    <Header />
    <Routes>
      <Route index element={<Home />} />
    </Routes>
    </Suspense>
  </>
);

export default App;
