import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from "./router"
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './pages/SubPage/AuthContext';
import Fonts from './Fonts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Fonts />
        <RouterProvider router={router} />
    </AuthProvider>
);