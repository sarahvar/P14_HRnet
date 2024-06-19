import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/homepage/Homepage';

const RouterComponent = () => (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
);

export default RouterComponent;