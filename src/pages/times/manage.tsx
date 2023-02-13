import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { authOptions } from "../../server/auth";
import { api } from "../../utils/api";

type FormValues = {
  id?: string;
  trackName: string;
  time: string;
  vehicle: string;
  game: string;
  userId: string;
};

const ManageTimes = () => {
  const createTime = api.times.addTime.useMutation();
  const { data: session } = useSession();

  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data: FormValues) => {
    const inputs = { ...data, userId: session?.user?.id };

    createTime
      .mutateAsync(inputs)
      .then(() => {
        return router.push("/times");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <div>Manage Times</div>
      <form onSubmit={() => onSubmit}>
        <label htmlFor="trackName">
          Track Name:
          <input
            id="trackName"
            {...register("trackName", { required: true })}
          />
        </label>
        <label htmlFor="time">
          Time:
          <input id="time" {...register("time", { required: true })} />
        </label>
        <label htmlFor="vehicle">
          Vehicle:
          <input id="vehicle" {...register("vehicle", { required: true })} />
        </label>
        <label htmlFor="game">
          Game:
          <input id="game" {...register("game", { required: true })} />
        </label>
        <button type="submit">Create Time</button>
      </form>
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
