// Fetch all times to display on table
import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import { authOptions } from "../../server/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { api } from "../../utils/api";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TrackTime } from "@prisma/client";
import { FiEdit } from "react-icons/fi";

const ManageTimes: NextPage = () => {
  const { data } = api.times.getAllTimes.useQuery();
  const [times, setTimes] = useState<TrackTime[]>();

  console.log(data);
  const BuildTimeRows = () => {
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
      <div>Times Page</div>
      <div className="m-4 flex flex-col">
        <div className="w-1/6">
          <Button>
            <Link href="/times/addTime">Add a Time</Link>
          </Button>
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

export default ManageTimes;
