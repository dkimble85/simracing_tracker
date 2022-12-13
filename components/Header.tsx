import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const Header = () => {
  const userContext = useContext(UserContext)
  const router = useRouter()

  const handleLogout = () => {
    userContext.setUser(null)
    router.push('/')
  }

  const formatName = (username: string) => {
    return username.charAt(0).toUpperCase() + username.slice(1)
  }

  console.log(userContext)

  return (
    <>
      <div className="bg-black p-2 text-white flex">
        <h1 className="text-3xl font-bold text-white">Racing Time Tracker</h1>
        {userContext.user ? (
          <div className="ml-auto p-2">
            Hello {formatName(userContext.user.username)},{' '}
            <button className="underline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link className="ml-auto p-2 underline" href="/user/login">
            Login
          </Link>
        )}
      </div>
    </>
  )
}
