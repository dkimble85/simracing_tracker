import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import { authOptions } from "../server/auth";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import ProfileScreen from "../components/ProfileScreen";

const profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sim Racing Time Tracker</title>
        <meta name="description" content="Sim Racing Time Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-2xl">Profile</h1>
      </div>
      <ProfileScreen />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default profile;
