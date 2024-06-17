import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Provider } from "react-redux";
import rootReducer from "./reducer/reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
