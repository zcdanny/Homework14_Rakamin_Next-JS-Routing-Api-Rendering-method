"use client";

import { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import { createBook } from "@/fetch/books";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("year", year);
      formData.append("pages", pages);
      formData.append("image", image);

      await createBook(formData);

      Swal.fire({
        icon: "success",
        title: "Book Added Successfully",
        text: "The new book has been added to the catalog.",
        showConfirmButton: false,
        timer: 2000,
      });

      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Book",
        text: "Oops! Something went wrong while adding the new book.",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };
  return (
    <>
      <Container borderRadius="2%" boxShadow="xl" px="30px" pb="25px" my="50px">
        <Text
          bgGradient="linear(to-l, black, blue.400)"
          bgClip="text"
          fontFamily="sans-serif"
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          py="10px"
        >
          Add New Book
        </Text>
        <FormControl>
          <Stack>
            <FormLabel mb={0}>Title</FormLabel>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Author
            </FormLabel>
            <Input type="text" onChange={(e) => setAuthor(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Publisher
            </FormLabel>
            <Input type="text" onChange={(e) => setPublisher(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Year
            </FormLabel>
            <Input type="text" onChange={(e) => setYear(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Number of Pages
            </FormLabel>
            <Input type="text" onChange={(e) => setPages(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Image
            </FormLabel>
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Stack>
          <Button
            bgGradient="linear(to-l, black, blue.500)"
            boxShadow="sm"
            color="white"
            w="80px"
            mt={3}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </FormControl>
      </Container>
    </>
  );
}
