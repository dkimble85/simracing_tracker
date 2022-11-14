import { FormControl, Input, InputGroup, InputRightElement, Stack, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-2xl">Sign-in to your account</h1>
      <div className="m-2">
        <form className="form" onSubmit={handleLoginSubmit}>
          <Stack spacing={3}>
            <FormControl isRequired>
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
            </FormControl>
            <FormControl isRequired>
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
            </FormControl>
          </Stack>

          <div className="flex justify-between">
            <Button mt={4} colorScheme="blue" type="submit">
              Login
            </Button>
            <Link href="/create-account" className="underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
