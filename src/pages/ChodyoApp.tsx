import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import HealthScreenForm from "./HealthScreenForm";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const App: React.FC = () => {
    return <AppRouter />;
};

const AppRouter: React.FC = () => {
    let query = useQuery();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health-screen" element={<HealthScreenForm dryRun={query.get("dryRun")} />} />
        </Routes>
    );
};

const ChodyoApp: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default ChodyoApp;
