import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <>
      <Head>
        <title>Sim Racing Time Tracker</title>
        <meta name="description" content="Sim Racing Time Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-4">
        <p className="text-2xl text-black">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl text-black">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
      </div>
    </>
  );
};

export default Home;
