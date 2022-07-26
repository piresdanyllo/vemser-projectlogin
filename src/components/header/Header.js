import {GiBowman} from "react-icons/gi"
import Menu from "../menu/Menu"
import styles from './Header.module.css'

const Header = () => {
  return (
    <header>
        <GiBowman/>
        <Menu/>
    </header>
  )
}

export default Header