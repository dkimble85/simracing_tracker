import { FormControl, Input, InputGroup, InputRightElement, Stack, Button } from '@chakra-ui/react'
import { useState, useContext, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const userContext = useContext(UserContext)
  const router = useRouter()

  const [input, setInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const handleLoginSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    // TODO: Check email and password against DB. If correct, then set User context [await]

    await userContext.setUser({
      username: target.username.value,
    })

    router.push('/')
  }

  return (
    <>
      <h1 className="text-2xl">Sign-in to your account</h1>
      <div className="m-2">
        <form className="form" onSubmit={handleLoginSubmit} name="loginForm">
          <Stack spacing={3}>
            <FormControl isRequired>
              <Input
                id="username"
                name="username"
                type="text"
                value={input}
                size="lg"
                placeholder="Insert username"
                isInvalid={false}
                errorBorderColor="crimson"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <InputGroup size="md">
                <Input
                  id="password"
                  name="password"
                  pr="4.5rem"
                  size="lg"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  isInvalid={false}
                  errorBorderColor="crimson"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>

          <div className="flex justify-between items-center">
            <Button mt={4} colorScheme="blue" type="submit">
              Login
            </Button>
          </div>
          <div className="flex justify-between py-3 items-center">
            <Link href="/user/forgot-password" className="underline">
              Forgot Password
            </Link>
            <Link href="/user/create-account" className="underline">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
