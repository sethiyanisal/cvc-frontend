import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    user:JSON.parse(localStorage.getItem('user'))
  });
  
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      { children }
    </AuthContext.Provider>
  )

}