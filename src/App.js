import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import NavBar from "./components/NavBar/NavBar";
import Router from "./routes";

function App() {
    document.body.style.backgroundColor = "rgb(36, 39, 41)";
    return (
        <BrowserRouter>
            <NavBar />
            <Router />
        </BrowserRouter>
    );
}

export default App;
