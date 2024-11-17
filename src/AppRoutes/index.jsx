import React from "react";

import { Routes, Route, Navigate} from "react-router-dom";

const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/Auth/Customer/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/Auth/Customer/RegisterPage'));
const LoginVendor = React.lazy(() => import('../pages/Auth/Vendor/LoginVendor'));
const RegisterVendor = React.lazy(() => import('../pages/Auth/Vendor/RegisterVendor'));
const VendorDashboard = React.lazy(() => import('../pages/VendorDashboard'));



function AppRoutes(props) {
    return (
        <React.Suspense>
            <Routes>
                <Route path='/'  element={<HomePage />}/>
                <Route path="/home" element={<Navigate to="/"/> } />
                <Route path='/login'  element={<LoginPage />}/>
                <Route path='/sign-up'  element={<RegisterPage />}/>
                <Route path='/vendor/login'  element={<LoginVendor />}/>
                <Route path='/vendor/on-boarding'  element={<RegisterVendor />}/>
                <Route path='/dashboard'  element={<VendorDashboard />}/>
            </Routes>
        </React.Suspense>
    );
}

export default AppRoutes;