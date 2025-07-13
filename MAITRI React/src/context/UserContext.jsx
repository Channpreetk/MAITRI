import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('maitriUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('maitriUser', JSON.stringify(userData))
  }

  const signup = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('maitriUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('maitriUser')
  }

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData }
    setUser(newUserData)
    localStorage.setItem('maitriUser', JSON.stringify(newUserData))
  }

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  )
}
