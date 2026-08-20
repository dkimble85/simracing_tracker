import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import { type NextPage } from "next";
import Link from "next/link";
import { useState, useMemo } from "react";
import { api } from "../../utils/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Icon,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

const Times: NextPage = () => {
  const { data: times, refetch } = api.times.getAllTimes.useQuery();
  const deleteTime = api.times.deleteTime.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this time?")) {
      deleteTime.mutate(id);
    }
  };

  const [gameFilter, setGameFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [trackFilter, setTrackFilter] = useState("");

  const uniqueGames = useMemo(() => {
    if (!times) return [];
    return [...new Set(times.map((t) => t.game))].sort();
  }, [times]);

  const uniqueClasses = useMemo(() => {
    if (!times) return [];
    return [...new Set(times.map((t) => t.vehicleClass ?? ""))].sort();
  }, [times]);

  const filteredTimes = useMemo(() => {
    if (!times) return [];
    return times.filter((entry) => {
      const matchesGame = !gameFilter || entry.game === gameFilter;
      const matchesClass =
        !classFilter || (entry.vehicleClass ?? "") === classFilter;
      const matchesTrack =
        !trackFilter ||
        entry.trackName.toLowerCase().includes(trackFilter.toLowerCase());
      return matchesGame && matchesClass && matchesTrack;
    });
  }, [times, gameFilter, classFilter, trackFilter]);

  const clearFilters = () => {
    setGameFilter("");
    setClassFilter("");
    setTrackFilter("");
  };

  const hasFilters = gameFilter || classFilter || trackFilter;

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Times Page
      </Heading>

      <Box mb={4} p={4} bg="gray.700" borderRadius="md">
        <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.300">
          Filters
        </Text>
        <Flex direction={{ base: "column", md: "row" }} gap={4}>
          <Select
            placeholder="All Games"
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
            size="sm"
            maxW={{ md: "200px" }}
            bg="gray.600"
            borderColor="gray.500"
          >
            {uniqueGames.map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </Select>
          <Select
            placeholder="All Classes"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            size="sm"
            maxW={{ md: "200px" }}
            bg="gray.600"
            borderColor="gray.500"
          >
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Filter by track..."
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            size="sm"
            maxW={{ md: "200px" }}
            bg="gray.600"
            borderColor="gray.500"
          />
          {hasFilters && (
            <Button
              size="sm"
              variant="ghost"
              onClick={clearFilters}
              color="gray.300"
              _hover={{ color: "white" }}
            >
              Clear
            </Button>
          )}
        </Flex>
        {filteredTimes.length !== (times?.length ?? 0) && (
          <Text fontSize="xs" color="gray.400" mt={2}>
            Showing {filteredTimes.length} of {times?.length ?? 0} times
          </Text>
        )}
      </Box>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Track Name</Th>
              <Th>Vehicle</Th>
              <Th>Vehicle Class</Th>
              <Th>Game</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTimes.map((entry) => (
              <Tr key={entry.id}>
                <Td fontFamily="mono">{entry.time}</Td>
                <Td>{entry.trackName}</Td>
                <Td>{entry.vehicle}</Td>
                <Td>{entry.vehicleClass}</Td>
                <Td>{entry.game}</Td>
                <Td>
                  <Flex gap={2}>
                    <Link href={`/times/edit/${encodeURIComponent(entry.id)}`}>
                      <Icon
                        as={FiEdit}
                        cursor="pointer"
                        color="purple.400"
                        _hover={{ color: "purple.300" }}
                      />
                    </Link>
                    <Icon
                      as={FiTrash2}
                      cursor="pointer"
                      color="red.400"
                      _hover={{ color: "red.300" }}
                      onClick={() => handleDelete(entry.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {!times && <Box p={4}>Loading...</Box>}
        {times?.length === 0 && (
          <Box p={4} textAlign="center" color="gray.400">
            No times yet. Add one below!
          </Box>
        )}
        {times && times.length > 0 && filteredTimes.length === 0 && (
          <Box p={4} textAlign="center" color="gray.400">
            No times match your filters.
          </Box>
        )}
      </Box>
      <Flex mt={4}>
        <Link href="/times/add">
          <Button bg="purple.500" color="white" _hover={{ bg: "purple.400" }}>
            Add a Time
          </Button>
        </Link>
      </Flex>
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

export default Times;
