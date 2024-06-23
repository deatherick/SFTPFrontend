import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import './index.css';
import Dashboard from './pages/Dashboard.jsx';
import QRCode from './pages/QRCode.jsx';
import Register from './pages/Register.jsx';
import { store } from './stores/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/qr-code",
    element: <QRCode />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
