import React, { createContext, useContext, useState, ReactNode } from 'react'

type UserType = 'A' | 'B'

interface UserContextType {
  activeUser: UserType
  setActiveUser: (user: UserType) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<UserType>('A')

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  )
}

