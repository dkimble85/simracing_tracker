import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { authOptions } from "../../../server/auth";
import { api } from "../../../utils/api";

const TimeDetails = () => {
  const { timeId } = useRouter().query as {
    timeId: string;
  };

  const trackTime = api.times.getTime.useQuery({
    timeId,
  });

  console.log(trackTime);
  return (
    <>
      <div className="flex flex-row">
        <div>
          <h1 className="bold pb-2 text-3xl">Track Time</h1>
        </div>
        <div>
          <Link href={"/times/manage"}>
            <Button>Back</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-2">
          <h2 className="text-xl">Track Name:</h2>{" "}
          <Editable placeholder={trackTime.data?.trackName}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        <div className="mb-2">
          <h2 className="text-xl">Track Time:</h2>{" "}
          <Editable placeholder={trackTime.data?.time}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        <div className="mb-2">
          <h2 className="text-xl">Vehicle:</h2>{" "}
          <Editable placeholder={trackTime.data?.vehicle}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        <div className="mb-2">
          <h2 className="text-xl">Vehicle Class:</h2>{" "}
          <Editable placeholder={trackTime.data?.vehicleClass as string}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        <div className="mb-2">
          <h2 className="text-xl">Game:</h2>{" "}
          <Editable placeholder={trackTime.data?.game}>
            <EditablePreview />
            <EditableInput />
          </Editable>
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

export default TimeDetails;
