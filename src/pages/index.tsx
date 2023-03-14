import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sim Racing Time Tracker</title>
        <meta name="description" content="Sim Racing Time Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to the Sim Racing Time Tracker (SRTT).
          </h1>
        </div>
        <div className="font-normal">
          Once you register an account or sign in, you will gain access to
          view/store your best times across your favorite sim racing games.
        </div>
        <div>Placeholder Screenshot</div>
      </div>
    </>
  );
};

export default Home;
