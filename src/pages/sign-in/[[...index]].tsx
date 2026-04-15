import { type NextPage } from "next";
import { SignIn } from "@clerk/nextjs";
import { Box } from "@chakra-ui/react";

const SignInPage: NextPage = () => {
  return (
    <Box
      minH="100vh"
      bg="gray.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        redirectUrl="/times"
      />
    </Box>
  );
};

export default SignInPage;
