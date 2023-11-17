import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
export default function Books({ id, title, author, image, year }) {
  return (
    <Stack
      my="6px"
      spacing="24px"
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: "50%", md: "500px" }}
      height={{ sm: "476px", md: "20rem" }}
      direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("#ffefcd", "white")}
      boxShadow={"2xl"}
      px={4}
    >
      <Flex flex={1} bg="blue.200">
        <Image
          objectFit="cover"
          boxSize="100%"
          src={`http://localhost:8000/${image}`}
          alt="#"
        />
      </Flex>
      <Stack flex={1} justifyContent="center" alignItems="center" p={1} pt={2}>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {title}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
          {year}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {author}
        </Text>

        <Stack mt={"2rem"} padding={2} alignItems={"center"}>
          <Link href={`/books/${id}`}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              colorScheme="orange"
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "orange.600",
              }}
              _focus={{
                bg: "orange.600",
              }}
            >
              Detail
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}
