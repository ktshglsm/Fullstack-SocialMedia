import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/authContext';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DarkModeContextProvider>
        <AuthContextProvider >
          <App />
        </AuthContextProvider>
      </DarkModeContextProvider>
    </PersistGate>
  </Provider>
);
