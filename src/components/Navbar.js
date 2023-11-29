import { Box, Flex, Link } from "@chakra-ui/react";
import { cookies } from "next/headers";
import Logout from "./Logout";

function Navbar() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return (
    <>
      <Flex
        as="header"
        position="sticky"
        bgGradient="linear(to-l, blue.700, black)"
        top={0}
        zIndex={999}
        w="100%"
        p="20px"
      >
        <Box fontWeight="bold" color="white" px="11px">
          <Link href="/">Home</Link>
        </Box>
        {!accessToken && (
          <Box fontWeight="bold" color="white" px="11px">
            <Link href="/register">Sign Up</Link>
          </Box>
        )}
        {accessToken && (
          <Box fontWeight="bold" color="white" px="11px">
            <Logout />
          </Box>
        )}
      </Flex>
    </>
  );
}

export default Navbar;
