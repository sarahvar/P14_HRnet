import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/homepage/homepage';
import Header from "../components/Header/Header.jsx";

const RouterComponent = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  </>
);

export default RouterComponent;
