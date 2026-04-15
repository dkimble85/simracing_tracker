import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FiClock, FiTrendingUp, FiAward, FiArrowRight } from "react-icons/fi";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Heading,
  Button,
  Flex,
  Container,
  Image,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sim Racing Time Tracker</title>
        <meta name="description" content="Sim Racing Time Tracker" />
        <link rel="icon" type="image/png" href="/favicons/SRTT_Favicon.png" />
      </Head>

      <Box
        minH="100vh"
        bg="gray.900"
        position="relative"
        overflow="hidden"
        pt="20"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(135deg, gray.900 0%, gray.800 50%, purple.900 100%)"
          opacity={0.5}
        />
        <Box
          position="absolute"
          top="-20%"
          right="-10%"
          w="600px"
          h="600px"
          borderRadius="full"
          bg="purple.600"
          filter="blur(150px)"
          opacity={0.15}
        />

        <Container maxW="container.xl" position="relative" pt={4}>
          <Flex direction="column" align="center" textAlign="center">
            <Image
              src="/images/SRTT_logo.png"
              alt="Sim Racing Time Tracker"
              w={{ base: "min(82vw, 260px)", md: "360px" }}
              h="auto"
              mb={6}
              mt={2}
            />

            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="white"
              mb={5}
              mt={2}
              lineHeight="1.2"
            >
              Track Your{" "}
              <Text as="span" color="purple.400">
                Best Times
              </Text>
              <br />
              Across Every Sim
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="gray.300" maxW="2xl" mb={8}>
              Store and track your fastest laps across your favorite sim racing
              games. Compete against yourself and see your improvement over
              time.
            </Text>

            <Flex gap={4} mb={2}>
              <Link href="/times">
                <Button
                  size="md"
                  bg="purple.500"
                  color="white"
                  _hover={{ bg: "purple.400" }}
                  rightIcon={<FiArrowRight />}
                >
                  Go to Times
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="md"
                  variant="outline"
                  borderColor="gray.600"
                  color="white"
                  _hover={{ bg: "gray.800", borderColor: "purple.400" }}
                >
                  Sign In
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>

        <Box bg="gray.900" py={16}>
          <Container maxW="container.xl">
            <Heading as="h2" size="lg" color="white" textAlign="center" mb={10}>
              Why Track Your Times?
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <FeatureCard
                icon={FiClock}
                title="Keep History"
                description="Never lose track of your best laps. Store and view your times across all your favorite games."
              />
              <FeatureCard
                icon={FiTrendingUp}
                title="Track Progress"
                description="See how your times improve over time. Set goals and watch yourself get faster."
              />
              <FeatureCard
                icon={FiAward}
                title="Best Times"
                description="Quickly access your personal records. Compare performance across different tracks and cars."
              />
            </SimpleGrid>
          </Container>
        </Box>

        <Box bg="gray.800" py={8}>
          <Container maxW="container.xl">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
            >
              <Text color="gray.400" fontSize="sm">
                © 2026 Sim Racing Time Tracker. All rights reserved.
              </Text>
              <Text color="gray.500" fontSize="sm" mt={{ base: 2, md: 0 }}>
                Built for sim racers, by sim racers.
              </Text>
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
};

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Box
      bg="gray.800"
      p={6}
      borderRadius="lg"
      border="1px"
      borderColor="gray.700"
      _hover={{ borderColor: "purple.500", transform: "translateY(-4px)" }}
      transition="all 0.3s ease"
    >
      <Box
        w={12}
        h={12}
        bg="purple.900"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Icon as={icon} boxSize={6} color="purple.400" />
      </Box>
      <Heading as="h3" size="sm" color="white" mb={3}>
        {title}
      </Heading>
      <Text color="gray.400" fontSize="sm">
        {description}
      </Text>
    </Box>
  );
};

export default Home;
