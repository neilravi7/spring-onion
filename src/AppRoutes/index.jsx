import React from "react";

import { Routes, Route} from "react-router-dom";

const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/Auth/Customer/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/Auth/Customer/RegisterPage'));


function AppRoutes(props) {
    return (
        <React.Suspense>
            <Routes>
                <Route path='/'  element={<HomePage />}/>
                <Route path='/login'  element={<LoginPage />}/>
                <Route path='/sign-up'  element={<RegisterPage />}/>
            </Routes>
        </React.Suspense>
    );
}

export default AppRoutes;