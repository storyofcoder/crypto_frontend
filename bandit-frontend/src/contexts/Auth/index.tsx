import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const authState = useSelector(({ auth }: any) => auth)
  useEffect(() => {
    async function loadUserFromStorage() {
      const user = localStorage.getItem('user')
      const walletAddress = localStorage.getItem('walletAddress')
      if (!!user && walletAddress) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    }
    loadUserFromStorage()
  }, [authState.user])

  return <AuthContext.Provider value={{ isLoggedIn: !!user, user, loading }}>{children}</AuthContext.Provider>
}
