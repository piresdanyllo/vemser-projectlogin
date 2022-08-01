import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import Item from "../item/Item";
import { Logout, Nav } from "./Menu.styled";

const Menu = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <>
      <Nav>
        <ul>
            <>
              <Item name="Endereço" url="/address" />
              <Item name="Pessoas" url="/people" />
            </>
        </ul>
      </Nav>
      <Logout onClick={handleLogout}>
        <BiLogOut></BiLogOut>
        <span>Sair</span>
      </Logout>
    </>
  );
};

export default Menu;
