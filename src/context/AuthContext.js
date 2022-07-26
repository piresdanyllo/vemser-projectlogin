import { createContext, useState } from "react"
import api from '../api'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  
  const [login, setLogin] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (values) => {
    try {
      const {data} = await api.post('/auth', values)
      localStorage.setItem('token', data)
      console.log(data)
      setLogin(true)
      navigate('/people')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleSignUp = async(values) => {
    try {
      await api.post('/auth/create', values)
      alert('Cadastro realizado com sucesso')
      navigate('/')
    } catch (error) {
      alert('Erro ao cadastrar')
      console.log(error)
    }
  }
  return (
   <AuthContext.Provider value={{handleLogin, handleLogout, handleSignUp}}>{children}</AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}