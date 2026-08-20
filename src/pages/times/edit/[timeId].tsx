import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  Heading,
  Flex,
  Link,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import { TrackTime } from "../../../types";

const TimeDetails = () => {
  const router = useRouter();

  const { timeId } = router.query as {
    timeId: string;
  };

  const { data: trackTime, isLoading } = api.times.getTime.useQuery({
    timeId,
  });

  const editTime = api.times.editTime.useMutation({
    onSuccess: () => router.push("/times"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackTime>();

  const onSubmit: SubmitHandler<TrackTime> = (data) => {
    editTime.mutate({ id: timeId, data });
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Edit Time
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={4}>
          <FormControl isInvalid={Boolean(errors.trackName)}>
            <FormLabel>Track Name</FormLabel>
            <Input
              id="trackName"
              defaultValue={trackTime?.trackName ?? ""}
              placeholder="e.g., Spa-Francorchamps"
              focusBorderColor="purple.500"
              {...register("trackName", { required: true })}
            />
            <FormErrorMessage>Please enter a track name</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.time)}>
            <FormLabel>Track Time</FormLabel>
            <Input
              id="time"
              defaultValue={trackTime?.time ?? ""}
              placeholder="00:00:000"
              focusBorderColor="purple.500"
              {...register("time", {
                required: true,
                pattern: /[0-9]{2}:[0-9]{2}:[0-9]{3}/i,
              })}
            />
            <FormErrorMessage>Required time format: 00:00:000</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.vehicle)}>
            <FormLabel>Vehicle</FormLabel>
            <Input
              id="vehicle"
              defaultValue={trackTime?.vehicle ?? ""}
              placeholder="e.g., Ferrari 488 GT3"
              focusBorderColor="purple.500"
              {...register("vehicle", { required: true })}
            />
            <FormErrorMessage>Please enter a vehicle</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.vehicleClass)}>
            <FormLabel>Vehicle Class</FormLabel>
            <Input
              id="vehicleClass"
              defaultValue={trackTime?.vehicleClass ?? ""}
              placeholder="e.g., GT3"
              focusBorderColor="purple.500"
              {...register("vehicleClass", { required: true })}
            />
            <FormErrorMessage>Please enter a vehicle class</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.game)}>
            <FormLabel>Game</FormLabel>
            <Input
              id="game"
              defaultValue={trackTime?.game ?? ""}
              placeholder="e.g., Assetto Corsa Competizione"
              focusBorderColor="purple.500"
              {...register("game", { required: true })}
            />
            <FormErrorMessage>Please enter a sim racing game</FormErrorMessage>
          </FormControl>

          <Flex gap={4} mt={4}>
            <Button
              isLoading={isSubmitting}
              loadingText="Saving"
              type="submit"
              bg="purple.500"
              color="white"
              _hover={{ bg: "purple.400" }}
            >
              Save
            </Button>
            <Link href="/times">
              <Button variant="outline">Back</Button>
            </Link>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;

  return { props: { ...buildClerkProps(ctx.req, { user }) } };
};

export default TimeDetails;
