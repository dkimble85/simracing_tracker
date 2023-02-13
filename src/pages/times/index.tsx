// Fetch all times to display on table
import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import { authOptions } from "../../server/auth";
import { getServerSession } from "next-auth/next";

const Times: NextPage = () => {
  return <div>Times Page</div>;
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

export default Times;
