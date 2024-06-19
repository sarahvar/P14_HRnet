import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import store, { persistor } from '../src/core/redux/store.js';
import RouterComponent from './src/routes/router.jsx';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <RouterComponent />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);