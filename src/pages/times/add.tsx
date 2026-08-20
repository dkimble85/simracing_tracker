import { type NextPage } from "next";
import { useRouter } from "next/router";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import { SubmitHandler, useForm } from "react-hook-form";

import { api } from "../../utils/api";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Heading,
  Box,
  Flex,
} from "@chakra-ui/react";
import { TrackTime } from "../../types";

const AddTime: NextPage = () => {
  const createTime = api.times.addTime.useMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackTime>();

  const onSubmit: SubmitHandler<TrackTime> = async (data) => {
    try {
      await createTime.mutateAsync(data);
      await router.push("/times");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Add Time
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={4}>
          <FormControl isRequired isInvalid={Boolean(errors.trackName)}>
            <FormLabel>Track Name</FormLabel>
            <Input
              id="trackName"
              placeholder="e.g., Spa-Francorchamps"
              focusBorderColor="purple.500"
              {...register("trackName", { required: true })}
            />
            <FormErrorMessage>Please enter a track name</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.time)}>
            <FormLabel>Track Time</FormLabel>
            <Input
              id="time"
              placeholder="00:00:000"
              focusBorderColor="purple.500"
              {...register("time", {
                required: true,
                pattern: /[0-9]{2}:[0-9]{2}:[0-9]{3}/i,
              })}
            />
            <FormErrorMessage>Required time format: 00:00:000</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.vehicle)}>
            <FormLabel>Vehicle</FormLabel>
            <Input
              id="vehicle"
              placeholder="e.g., Ferrari 488 GT3"
              focusBorderColor="purple.500"
              {...register("vehicle", { required: true })}
            />
            <FormErrorMessage>Please enter a vehicle</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.vehicleClass)}>
            <FormLabel>Vehicle Class</FormLabel>
            <Input
              id="vehicleClass"
              placeholder="e.g., GT3"
              focusBorderColor="purple.500"
              {...register("vehicleClass", { required: true })}
            />
            <FormErrorMessage>Please enter a vehicle class</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.game)}>
            <FormLabel>Game</FormLabel>
            <Input
              id="game"
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
              Create Time
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

export default AddTime;
