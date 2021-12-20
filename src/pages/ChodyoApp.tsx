import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import HealthScreenForm from "./HealthScreenForm";

const App: React.FC = () => {
    return <AppRouter />;
};

const AppRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health-screen" element={<HealthScreenForm />} />
    </Routes>
);

const ChodyoApp: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default ChodyoApp;
