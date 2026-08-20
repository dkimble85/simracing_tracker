import type { ReactNode } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, Flex, HStack, Icon, Link, Text, Button } from "@chakra-ui/react";
import { FiHome, FiClock } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const NavLinks: LinkItemProps[] = [{ name: "Home", icon: FiHome, route: "/" }];

const ProtectedNavLinks: LinkItemProps[] = [
  { name: "Track Times", icon: FiClock, route: "/times" },
];

export default function NavShell({ children }: { children: ReactNode }) {
  return (
    <Box minH="100vh" bg="gray.900">
      <Box
        as="nav"
        bg="gray.800"
        borderBottom="1px"
        borderColor="gray.700"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Flex
          maxW="container.xl"
          mx="auto"
          px={4}
          h="20"
          align="center"
          justify="space-between"
        >
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            {NavLinks.map((link) => (
              <NavItem key={link.name} icon={link.icon} route={link.route}>
                {link.name}
              </NavItem>
            ))}
            <SignedIn>
              {ProtectedNavLinks.map((link) => (
                <NavItem key={link.name} icon={link.icon} route={link.route}>
                  {link.name}
                </NavItem>
              ))}
            </SignedIn>
          </HStack>

          <HStack spacing={4}>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  size="sm"
                  bg="purple.500"
                  color="white"
                  _hover={{ bg: "purple.400" }}
                >
                  Sign In
                </Button>
              </Link>
            </SignedOut>
          </HStack>
        </Flex>
      </Box>

      <Box pt="20" px={6} pb={6} bg="gray.900" minH="100vh">
        <Box
          bg="gray.800"
          rounded="lg"
          boxShadow="xl"
          p={6}
          maxW="container.xl"
          mx="auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

interface NavItemProps {
  icon: IconType;
  children: ReactText;
  route: string;
}

const NavItem = ({ icon, children, route }: NavItemProps) => {
  return (
    <Link
      href={route}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <HStack
        spacing={2}
        px={3}
        py={2}
        borderRadius="md"
        cursor="pointer"
        color="gray.300"
        _hover={{
          bg: "purple.600",
          color: "white",
        }}
        transition="all 0.2s"
      >
        <Icon as={icon} boxSize={4} />
        <Text fontSize="sm" fontWeight="medium">
          {children}
        </Text>
      </HStack>
    </Link>
  );
};
