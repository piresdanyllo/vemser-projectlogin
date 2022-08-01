import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import People from "./pages/people/People";
import PeopleForm from "./pages/people/PeopleForm";
import AddressForm from "./pages/address/AddressForm";
import Address from "./pages/address/Address";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Routers = () => {
  const { auth } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {!auth ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<Users />} />
          </>
        ) : (
          <>
            <Route path="/people" element={<People />} />
            <Route path="/person/create" element={<PeopleForm />} />
            <Route path="/person/edit/:id" element={<PeopleForm />} />
            <Route path="/address/create/:idPessoa" element={<AddressForm />} />
            <Route path="/address/edit/:idPessoa/:idEndereco" element={<AddressForm />} />
            <Route path="/address" element={<Address />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
