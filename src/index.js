import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from "./router"
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './pages/SubPage/AuthContext';
import Fonts from './Fonts';
import { isMobile, isTablet } from 'react-device-detect';

if (isMobile || isTablet) {
    alert('데스크탑으로만 이용이 가능합니다.');
    window.location.href = 'about:blank';
} else {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <AuthProvider>
            <Fonts />
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
