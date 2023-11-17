import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteBook, getBookDetailById } from "@/modules/fetch";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/navbar";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        console.log(response);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Box>
        {isLoading ? (
          <Skeleton height="300px" my="6" />
        ) : (
          <Stack
            width="3xl"
            borderRadius="lg"
            w={{ sm: "100%", md: "700px" }}
            height={{ sm: "476px", md: "30rem" }}
            direction={{ base: "column", md: "row" }}
            bg={useColorModeValue("#ffefcd", "white")}
            boxShadow={"2xl"}
            padding={15}
            mt="20%"
          >
            <Flex flex={1} bg="blue.200">
              <Image
                objectFit="cover"
                boxSize="100%"
                src={`http://localhost:8000/${book.image}`}
                alt="{book.title}"
              />
            </Flex>
            <Stack
              flex={1}
              justifyContent="center"
              alignItems="center"
              p={1}
              pt={2}
            >
              <Heading fontSize={"4xl"} fontFamily={"body"}>
                {book.title}
              </Heading>
              <Text
                fontWeight={600}
                fontSize={"2xl"}
                color={"gray.500"}
                size="sm"
                mb={4}
              >
                {book.year}
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"2xl"}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue("gray.700", "gray.400")}
                px={3}
              >
                Written by {book.author}
                <br />
                Published by {book.publisher}
                <br />
                {book.pages} pages
              </Text>

              {localStorage.getItem("token") && (
                <Stack
                  width={"100%"}
                  mt={"2rem"}
                  direction={"row"}
                  padding={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Link to={`/editbook/${id}`}>
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      rounded={"full"}
                      colorScheme="teal"
                      boxShadow={
                        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                      }
                      _hover={{
                        bg: "teal.6000",
                      }}
                      _focus={{
                        bg: "teal.6000",
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        colorScheme="red"
                        flex={1}
                        fontSize={"sm"}
                        rounded={"full"}
                        boxShadow={
                          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                          bg: "red.600",
                        }}
                        _focus={{
                          bg: "red.600",
                        }}
                      >
                        Delete
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to delete this book?
                      </PopoverBody>
                      <Button onClick={handleDeleteBook} colorScheme="red">
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </Box>
    </ChakraProvider>
  );
}
