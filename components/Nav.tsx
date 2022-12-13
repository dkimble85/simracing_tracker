import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const Nav = () => {
  const userContext = useContext(UserContext)

  return (
    <>
      <nav className="bg-white w-32 border-r border-black p-3">
        <div>
          <Link href="/" className="font-bold my-1">
            Home
          </Link>
        </div>
        {userContext.user && (
          <>
            <div>
              <Link href="/times" className="my-1">
                View Times
              </Link>
            </div>
            <div>
              <Link href="/addEdit" className="my-1">
                Add/Edit
              </Link>
            </div>
          </>
        )}
      </nav>
    </>
  )
}
