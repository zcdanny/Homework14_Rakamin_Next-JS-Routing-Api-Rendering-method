"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Center,
} from "@chakra-ui/react";
import { getBookById, updateBook } from "@/fetch/books";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function UpdateBook({ params }) {
  const { id } = params;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { book } = await getBookById(id);

      setTitle(book.title);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setYear(book.year);
      setPages(book.pages);
    }
    fetchData();
  }, [id]);

  const router = useRouter();

  const handleUpdate = async () => {
    try {
      await updateBook(id, {
        title,
        author,
        publisher,
        year: +year,
        pages: +pages,
      });

      Swal.fire({
        icon: "success",
        title: "Book Updated Successfully",
        text: "The book details have been successfully updated.",
        showConfirmButton: false,
        timer: 2000,
      });

      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update Book",
        text: "Oops! Something went wrong while updating the book details.",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <>
      <Container
        borderRadius="4%"
        boxShadow="xl"
        w="450px"
        px="30px"
        pt="30px"
        pb="25px"
        my="40px"
      >
        <Stack>
          <Text
            bgGradient="linear(to-l, black, blue.400)"
            bgClip="text"
            fontFamily="sans-serif"
            fontSize="3xl"
            fontWeight="bold"
            textAlign="center"
          >
            Update Book
          </Text>
          <FormControl>
            <Stack>
              <FormLabel mb={0}>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormLabel mt={2} mb={0}>
                Author
              </FormLabel>
              <Input
                value={author}
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
              />
              <FormLabel mt={2} mb={0}>
                Publisher
              </FormLabel>
              <Input
                value={publisher}
                type="text"
                onChange={(e) => setPublisher(e.target.value)}
              />
              <FormLabel mt={2} mb={0}>
                Year
              </FormLabel>
              <Input
                value={year}
                type="text"
                onChange={(e) => setYear(e.target.value)}
              />
              <FormLabel mt={2} mb={0}>
                Number of Pages
              </FormLabel>
              <Input
                value={pages}
                type="text"
                onChange={(e) => setPages(e.target.value)}
              />
            </Stack>
            <Center>
              <Button
                bgGradient="linear(to-l, black, blue.500)"
                boxShadow="sm"
                color="white"
                w="95px"
                mt={3}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Center>
          </FormControl>
        </Stack>
      </Container>
    </>
  );
}
