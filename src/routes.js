import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import News from "./pages/News/News";
import AuthLayout from "./layout/AuthLayout";

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: "login",
            element: <LoginPage />,
        },
        {
            path: "register",
            element: <RegisterPage />,
        },
        {
            path: "/",
            element: <AuthLayout />,
            children: [{ path: "/", element: <News /> }],
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ]);

    return routes;
}
