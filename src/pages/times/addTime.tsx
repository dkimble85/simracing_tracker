import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { authOptions } from "../../server/auth";
import { api } from "../../utils/api";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { TrackTime } from "../../types";

const AddTime: NextPage = () => {
  const createTime = api.times.addTime.useMutation();
  const { data: session } = useSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackTime>();

  const onSubmit: SubmitHandler<TrackTime> = (data) => {
    const inputs = { ...data, userId: session?.user.id as string };

    console.log(errors);
    try {
      createTime
        .mutateAsync(inputs)
        .then(() => {
          return router.push("/times");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1 className="bold text-2xl">Add Time</h1>
      </div>
      <form
        className="mt-4 flex flex-col space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          variant="floating"
          isRequired
          isInvalid={Boolean(errors.trackName)}
        >
          <Input
            className="ml-2"
            id="trackName"
            width="auto"
            placeholder=""
            focusBorderColor="purple.500"
            size="md"
            {...register("trackName", { required: true })}
          />
          <FormLabel>Track Name</FormLabel>
          <FormErrorMessage>Please enter a track name</FormErrorMessage>
        </FormControl>
        <FormControl
          variant="floating"
          isRequired
          isInvalid={Boolean(errors.time)}
        >
          <Input
            className="ml-2"
            id="time"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            {...register("time", {
              required: "Required format 00:00:000",
              pattern: /[0-9]{2}:[0-9]{2}:[0-9]{3}/i,
            })}
          />
          <FormLabel>Time</FormLabel>
          <FormErrorMessage>Required time format: 00:00:000</FormErrorMessage>
        </FormControl>
        <FormControl
          variant="floating"
          isRequired
          isInvalid={Boolean(errors.vehicle)}
        >
          <Input
            className="ml-2"
            id="vehicle"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            {...register("vehicle", { required: true })}
          />
          <FormLabel htmlFor="vehicle">Vehicle</FormLabel>
          <FormErrorMessage>Please enter a vehicle</FormErrorMessage>
        </FormControl>
        <FormControl
          variant="floating"
          isRequired
          isInvalid={Boolean(errors.vehicleClass)}
        >
          <Input
            className="ml-2"
            id="vehicleClass"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            {...register("vehicleClass", { required: true })}
          />
          <FormLabel>Vehicle Class</FormLabel>
          <FormErrorMessage>Please enter a vehicle class</FormErrorMessage>
        </FormControl>
        <FormControl
          variant="floating"
          isRequired
          isInvalid={Boolean(errors.game)}
        >
          <Input
            className="ml-2"
            id="game"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            {...register("game", { required: true })}
          />
          <FormLabel htmlFor="game">Game:</FormLabel>
          <FormErrorMessage>Please enter a sim racing game</FormErrorMessage>
          <div>
            <Button
              isLoading={isSubmitting}
              className="m-2 w-1/6"
              colorScheme="purple"
              type="submit"
            >
              Create Time
            </Button>
            <Button className="m-2 w-1/6" variant="outline">
              <Link href="/times">Back</Link>
            </Button>
          </div>
        </FormControl>
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

export default AddTime;
