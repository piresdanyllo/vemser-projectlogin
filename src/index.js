import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Routers from "./routers";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
        <Routers />
  </AuthProvider>
);
