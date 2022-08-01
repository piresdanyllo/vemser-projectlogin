import { createContext, useState, useEffect } from "react"
import api from '../api'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.common['Authorization'] = token
      setAuth(true)
    }
    setLoading(false)
  },[])
  
  const handleLogin = async (values) => {
    try {
      const {data} = await api.post('/auth', values)
      localStorage.setItem('token', data)
      api.defaults.headers.common['Authorization'] = data
      setAuth(true)
      window.location.href = '/people'
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    api.defaults.headers.common['Authorization'] = undefined
    setAuth(false)
    window.location.href = '/'
  }

  const handleSignUp = async(values) => {
    try {
      await api.post('/auth/create', values)
      alert('Cadastro realizado com sucesso')
      window.location.href = '/'
    } catch (error) {
      alert('Erro ao cadastrar')
      console.log(error)
    }
  }

  if(loading){
    return(
      <h1>Loading</h1>
    )
  }

  return (
   <AuthContext.Provider value={{handleLogin, handleLogout, handleSignUp, auth, loading}}>{children}</AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}