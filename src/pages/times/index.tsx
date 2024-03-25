// Fetch all times to display on table
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import { type NextPage } from "next";
import Link from "next/link";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { TrackTime } from "@prisma/client";
import { FiEdit } from "react-icons/fi";

const Times: NextPage = () => {
  const { data } = api.times.getAllTimes.useQuery();
  const [times, setTimes] = useState<TrackTime[]>();

  const BuildTimeRows = () => {
    console.log(data);
    return times?.map((entry) => (
      <div className="grid grid-cols-6 p-1" key={entry.id}>
        <div>{entry.time}</div>
        <div>{entry.trackName}</div>
        <div>{entry.vehicle}</div>
        <div>{entry.vehicleClass}</div>
        <div>{entry.game}</div>
        <div>
          <Link href={`/times/edit/${encodeURIComponent(entry.id)}`}>
            <FiEdit />
          </Link>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    setTimes(data);
  }, [data]);

  return (
    <>
      <div>
        <h1 className="bold text-2xl">Times Page</h1>
      </div>
      <div className="m-4 flex flex-col">
        <div className="w-1/6">
          <Link
            href="/times/addTime"
            className="rounded bg-purple-800 p-2 text-white"
          >
            Add a Time
          </Link>
        </div>
        <div className="mt-2 rounded border border-solid border-black p-2">
          <div className="grid grid-cols-6 border-b border-solid">
            <div>Time</div>
            <div>Track Name</div>
            <div>Vehicle</div>
            <div>Vehicle Class</div>
            <div>Game</div>
            <div>&nbsp;</div>
          </div>
          {times ? BuildTimeRows() : "Loading..."}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;

  return { props: { ...buildClerkProps(ctx.req, { user }) } };
};

export default Times;
