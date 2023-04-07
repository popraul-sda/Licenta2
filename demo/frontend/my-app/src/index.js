import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {StateProvider} from "./components/product-page-components/StateProvider";
import reducer, {initialState} from "./components/product-page-components/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <StateProvider initialState={initialState} reducer={reducer}>
              <App />
          </StateProvider>
      </BrowserRouter>
  </React.StrictMode>
);
