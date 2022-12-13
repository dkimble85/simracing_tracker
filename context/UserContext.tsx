import { createContext, useMemo, useState } from 'react'

export type AuthUser = {
  username: string
}

type UserContextProviderProps = {
  children: React.ReactNode
}

type UserContextType = {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  const providerUserValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return <UserContext.Provider value={providerUserValue}>{children}</UserContext.Provider>
}
