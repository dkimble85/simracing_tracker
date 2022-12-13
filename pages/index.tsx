import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Home = () => {
  const userContext = useContext(UserContext)
  const username = userContext.user?.username

  return (
    <div>
      <main className="min-h-screen flex flex-1 flex-col w-full">
        {userContext.user ? (
          <>
            <h1 className="text-2xl">Welcome back, {username}!</h1>
            <div>Take a peek at your best times</div>
          </>
        ) : (
          <>
            <h1 className="text-2xl">Welcome to your personal time tracker for sim racing!</h1>
            <div>
              This is a place where you can track your fastest times across different sim games. Add
              times, edit them, and track your personal bests.
            </div>
            <div>Login with your credentials or register a new account to start!</div>
          </>
        )}
      </main>
    </div>
  )
}

export default Home
