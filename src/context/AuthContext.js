import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
