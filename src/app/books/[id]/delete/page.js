"use client";

import { useEffect, useState } from "react";
import { deleteBook } from "@/fetch/books";
import {
  Container,
  Card,
  CardBody,
  Image,
  Stack,
  HStack,
  Heading,
  Text,
  Box,
  Button,
  Center,
} from "@chakra-ui/react";
import { getBookById } from "@/fetch/books";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function BookDetail({ params }) {
  const { id } = params;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { book } = await getBookById(id);

      setTitle(book.title);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setYear(book.year);
      setImage(book.image);
    }
    fetchData();
  }, [id]);

  const router = useRouter();

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);

      Swal.fire({
        icon: "success",
        title: "Book Deleted Successfully",
        text: "The selected book has been removed from the catalog.",
        showConfirmButton: false,
        timer: 2000,
      });

      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Delete Book",
        text: "Oops! Something went wrong while deleting the selected book.",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <Container
      bgColor="blackAlpha.200"
      boxShadow="xl"
      maxW="5xl"
      px="30px"
      pt="30px"
      pb="25px"
      my="40px"
    >
      <Text
        fontFamily="sans-serif"
        fontSize="3xl"
        fontWeight="bold"
        color="red"
        textAlign="center"
      >
        Delete Confirmation
      </Text>
      <Text fontFamily="sans-serif" fontSize="2xl" textAlign="center" my="10px">
        You are about to delete the book:
      </Text>
      <Card
        colorScheme="red"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="filled"
      >
        <Image
          objectFit="contain"
          maxW={{ base: "100%", sm: "200px" }}
          ml="5"
          src={`http://localhost:3000/${image}`}
          fallbackSrc="https://via.placeholder.com/200"
        />

        <Stack>
          <CardBody>
            <Heading size="lg">{title}</Heading>

            <Text mt="3">
              <strong>Author:</strong> {author}
            </Text>
            <Text mt="1">
              <strong>Publisher:</strong> {publisher}
            </Text>
            <Text mt="1">
              <strong>Year:</strong> {year}
            </Text>
            <Text mt="1">
              <strong>Synopsis:</strong>
            </Text>
            <Box mt="1" style={{ maxHeight: "160px", overflowY: "auto" }}>
              <Text>
                This section serves as a temporary space for the book's
                synopsis. In the near future, you'll discover a captivating
                narrative filled with intriguing characters, intricate plots,
                and unexpected twists. Dive into the world of this book, where
                adventure, mystery, and emotion intertwine to create an
                unforgettable reading experience.
              </Text>
              <Text mt="3">
                Keep an eye out for the official synopsis, which will transport
                you into the heart of the story and leave you eager to delve
                deeper into its pages. As the words unfold, you'll embark on a
                literary journey like no other, immersing yourself in a world
                where imagination knows no bounds, and the magic of storytelling
                knows no limits.
              </Text>
            </Box>
          </CardBody>
        </Stack>
      </Card>
      <Text fontFamily="sans-serif" fontSize="2xl" textAlign="center" my="15px">
        Are you sure?{" "}
        <Text as="span" color="red">
          There is no undo!
        </Text>
      </Text>
      <Center>
        <HStack>
          <Button
            fontSize="2xl"
            color="white"
            bgColor="gray.500"
            onClick={() => router.push("/")}
          >
            No, keep the book
          </Button>
          <Button
            fontSize="2xl"
            colorScheme="red"
            onClick={() => {
              handleDeleteBook(id);
            }}
          >
            Yes, delete this book
          </Button>
        </HStack>
      </Center>
    </Container>
  );
}
