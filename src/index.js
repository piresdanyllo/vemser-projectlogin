import React from "react";
import ReactDOM from "react-dom/client";
import { AddressProvider } from "./context/AddressContext";
import { AuthProvider } from "./context/AuthContext";
import { PeopleProvider } from "./context/PeopleContext";
import "./index.css";
import Routers from "./routers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <PeopleProvider>
      <AddressProvider>
        <Routers />
      </AddressProvider>
    </PeopleProvider>
  </AuthProvider>
);
