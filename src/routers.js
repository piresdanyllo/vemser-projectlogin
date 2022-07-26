import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import People from './pages/people/People'
import Address from './pages/address/Address'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const Routers = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/people" element={<People />} />
          <Route path="/address" element={<Address />} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routers;
