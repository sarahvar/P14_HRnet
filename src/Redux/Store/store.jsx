import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../Slice/employeeSlice";
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';

// Configuration de la persistance
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['loading', 'error'],
};

// Appliquez la configuration de persistance à employeeSlice
const persistedEmployeeReducer = persistReducer(persistConfig, employeeSlice);

// Configurez le store
const store = configureStore({
  reducer: {
    employee: persistedEmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Créez une fonction pour arrêter la persistance après un délai spécifié
const stopPersistAfterDelay = (delay) => {
  setTimeout(() => {
    persistStore(store).purge(); // Arrêtez la persistance des données
  }, delay);
};

// Appelez la fonction pour arrêter la persistance après 24 heures en millisecondes
stopPersistAfterDelay(86400000);

export default store;
export const persistor = persistStore(store);
