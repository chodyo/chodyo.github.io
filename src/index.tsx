import React from "react";
import ReactDOM from "react-dom";
import ChodyoApp from "./pages/ChodyoApp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <ChodyoApp />
    </React.StrictMode>,
    document.getElementById("root")
);
