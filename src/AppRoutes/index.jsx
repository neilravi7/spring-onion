import React from "react";

import { Routes, Route, Navigate} from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/Auth/Customer/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/Auth/Customer/RegisterPage'));
const LoginVendor = React.lazy(() => import('../pages/Auth/Vendor/LoginVendor'));
const RegisterVendor = React.lazy(() => import('../pages/Auth/Vendor/RegisterVendor'));
const VendorHome = React.lazy(() => import("../pages/Dashboard/VendorHome"));
const VendorMenu = React.lazy(() => import("../pages/Dashboard/VendorMenu"));
const VendorProfile = React.lazy(() => import("../pages/Dashboard/VendorProfile"));
const VendorProfileEdit = React.lazy(() => import("../pages/Dashboard/VendorProfileEdit"));





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
                <Route path='/admin'  element={<DashboardLayout />}>
                    <Route path='/admin/home'  element={<VendorHome />}/>
                    <Route path='/admin/profile'  element={<VendorProfile />}/>
                    <Route path='/admin/profile/edit'  element={<VendorProfileEdit />}/>
                    <Route path='/admin/menu'  element={<VendorMenu />}/>
                </Route>
            </Routes>
        </React.Suspense>
    );
}

export default AppRoutes;