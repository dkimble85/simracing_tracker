import React, { useContext, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
} from '@chakra-ui/react'

import { UserContext } from '../../context/UserContext'
import { useRouter } from 'next/router'

const CreateAccount = () => {
  const userContext = useContext(UserContext)
  const router = useRouter()

  const [fNameInput, setFNameInput] = useState('')
  const [lNameInput, setLNameInput] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const handleFNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFNameInput(e.target.value)
  const handleLNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLNameInput(e.target.value)
  const handleUsernameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsernameInput(e.target.value)
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmailInput(e.target.value)

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      fname: { value: string }
      lname: { value: string }
      username: { value: string }
      email: { value: string }
      password: { value: string }
      confirmPassword: { value: string }
    }

    if (target.password.value !== target.confirmPassword.value) {
      return 'Passwords do not match'
    }

    userContext.setUser({ username: target.username.value })

    router.push('/')
  }

  return (
    <>
      <h1 className="text-2xl">Create Account</h1>

      <div className="m-2">
        <form className="form" onSubmit={handleLoginSubmit}>
          <Stack spacing={3}>
            <div className="flex flex-row justify-between">
              <FormLabel htmlFor="fname">First Name:</FormLabel>
              <Input
                id="fname"
                type="fname"
                value={fNameInput}
                size="lg"
                onChange={handleFNameInputChange}
              />
              <FormLabel htmlFor="lname">Last Name:</FormLabel>
              <Input
                id="lname"
                type="lname"
                value={lNameInput}
                size="lg"
                onChange={handleLNameInputChange}
              />
            </div>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                id="email"
                type="email"
                value={usernameInput}
                size="lg"
                placeholder="abc@gmail.com"
                isInvalid={false}
                errorBorderColor="crimson"
                onChange={handleUsernameInputChange}
              />
              <FormLabel htmlFor="username">Username:</FormLabel>
              <Input
                id="username"
                type="username"
                value={emailInput}
                size="lg"
                placeholder="LightningMcQueen13"
                isInvalid={false}
                errorBorderColor="crimson"
                onChange={handleEmailInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password:</FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
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
              <FormLabel htmlFor="confirmPassword">Confirm Password:</FormLabel>
              <InputGroup size="md">
                <Input
                  id="confirmPassword"
                  pr="4.5rem"
                  size="lg"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  isInvalid={false}
                  errorBorderColor="crimson"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowConfirmPassword}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>

          <div className="flex justify-between">
            <Button mt={4} colorScheme="blue" type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateAccount
