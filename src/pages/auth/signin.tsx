import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../server/auth";
import { Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import googleSignIn from "../../../public/btn_google_light.svg";

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="mx-auto">
      <h1 className="mb-4 text-4xl font-extrabold">Sign-In</h1>

      {Object.values(providers).map((provider) => (
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          overflow="hidden"
          key={provider.name}
        >
          <Box p="3">
            <Box>
              <Box as="span" bgColor="white" color="gray.600" fontSize="sm">
                <Button onClick={() => signIn(provider.id)}>
                  <Image
                    alt="Google SignIn"
                    src={googleSignIn}
                    width={45}
                    height={45}
                    style={{
                      maxWidth: "25%",
                      height: "auto",
                      display: "inline",
                    }}
                  />{" "}
                  Sign in with Google
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default SignIn;
