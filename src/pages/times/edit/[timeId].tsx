import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { authOptions } from "../../../server/auth";
import { api } from "../../../utils/api";
import { TrackTime } from "../../../types";

const TimeDetails = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { timeId } = useRouter().query as {
    timeId: string;
  };

  const trackTime = api.times.getTime.useQuery({
    timeId,
  });
  const editTime = api.times.editTime.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackTime>();

  const onSubmit: SubmitHandler<TrackTime> = (data) => {
    const defaultValues = {
      trackName: "",
      time: "",
      vehicle: "",
      vehicleClass: "",
      game: "",
    };

    Object.entries(data).forEach((entry) => {
      const [key] = entry;
      const input = document.getElementById(key) as HTMLInputElement | null;

      if (!input?.value === "") {
        defaultValues[key] = input?.defaultValue;
      } else {
        defaultValues[key] = input?.value;
      }
    });

    const inputs = {
      data: {
        ...defaultValues,
        updatedAt: new Date(),
        userId: session?.user.id as string,
      },
      id: timeId,
    };

    console.log(inputs);
    console.log(errors);
    try {
      editTime
        .mutateAsync(inputs)
        .then(() => {
          return router.push("/times/manage");
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
      <div className="flex flex-row">
        <div>
          <h1 className="bold pb-2 text-3xl">Track Time</h1>
        </div>
      </div>
      <form
        className="mt-4 flex flex-col space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={Boolean(errors.trackName)}>
          <FormLabel>Track Name</FormLabel>
          <Input
            className="ml-2"
            id="trackName"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            defaultValue={trackTime.data?.trackName}
            placeholder={trackTime.data?.trackName}
            {...(register("trackName"), { required: true })}
          />
          <FormErrorMessage>Please enter a track name</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.time)}>
          <FormLabel>Track Time</FormLabel>
          <Input
            className="ml-2"
            id="time"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            defaultValue={trackTime.data?.time}
            placeholder={trackTime.data?.time}
            {...(register("time"),
            {
              required: true,
            })}
          />
          <FormErrorMessage>Required time format: 00:00:000</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.vehicle)}>
          <FormLabel htmlFor="vehicle">Vehicle</FormLabel>
          <Input
            className="ml-2"
            id="vehicle"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            defaultValue={trackTime.data?.vehicle}
            placeholder={trackTime.data?.vehicle}
            {...(register("vehicle"), { required: true })}
          />
          <FormErrorMessage>Please enter a vehicle</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.vehicleClass)}>
          <FormLabel>Vehicle Class</FormLabel>
          <Input
            className="ml-2"
            id="vehicleClass"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            defaultValue={trackTime.data?.vehicleClass as string}
            placeholder={trackTime.data?.vehicleClass as string}
            {...(register("vehicleClass"), { required: true })}
          />
          <FormErrorMessage>Please enter a vehicle class</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.game)}>
          <FormLabel htmlFor="game">Game:</FormLabel>
          <Input
            className="ml-2"
            id="game"
            width="auto"
            focusBorderColor="purple.500"
            size="md"
            defaultValue={trackTime.data?.game}
            placeholder={trackTime.data?.game}
            {...(register("game"), { required: true })}
          />
          <FormErrorMessage>Please enter a sim racing game</FormErrorMessage>
        </FormControl>

        <div>
          <Button
            isLoading={isSubmitting}
            className="m-2 w-1/6"
            colorScheme="purple"
            type="submit"
          >
            Update Time
          </Button>
          <Link href="/times/manage">
            <Button className="m-2 w-1/6" variant="outline">
              Back
            </Button>
          </Link>
        </div>
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

export default TimeDetails;
