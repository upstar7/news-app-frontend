import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// ----------------------------------------------------------------------

export default function AuthLayout() {
    const { token } = useContext(AuthContext);
    return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
}
