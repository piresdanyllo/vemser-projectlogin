import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Item from "../item/Item";

const Menu = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <nav>
        <ul>
          {!token ? (
            <>
              <Item name="Login" url="/" />
              <Item name="Cadastrar Usuário" url="/users" />
            </>
          ) : (
            <>
              <Item name="Endereço" url="/address" />
              <Item name="Pessoas" url="/people" />
            </>
          )}
        </ul>
      </nav>
      {token && <button onClick={handleLogout}>Sair</button>}
    </>
  );
};

export default Menu;
