import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';

const CreateAccount = () => {
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-2xl">Create Account</h1>

      <div className="m-2">
        <form className="form" onSubmit={handleLoginSubmit}>
          <Stack spacing={3}>
            <div className="flex flex-row justify-between">
              <FormLabel htmlFor="fname">First Name:</FormLabel>
              <Input id="fname" type="fname" value={input} size="lg" onChange={handleInputChange} />
              <FormLabel htmlFor="lname">Last Name:</FormLabel>
              <Input id="lname" type="lname" value={input} size="lg" onChange={handleInputChange} />
            </div>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                id="email"
                type="email"
                value={input}
                size="lg"
                placeholder="abc@gmail.com"
                isInvalid={false}
                errorBorderColor="crimson"
                onChange={handleInputChange}
              />
              <FormLabel htmlFor="username">Username:</FormLabel>
              <Input
                id="username"
                type="username"
                value={input}
                size="lg"
                placeholder="LightningMcQueen13"
                isInvalid={false}
                errorBorderColor="crimson"
                onChange={handleInputChange}
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
  );
};

export default CreateAccount;
