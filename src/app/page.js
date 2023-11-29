"use client";

// import styles from './page.module.css'
import { useEffect, useState } from "react";
import { getAllBooks } from "@/fetch/books";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Spinner,
  Stack,
  Image,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchBooks = async () => {
    try {
      // client-side rendering
      // load the page first, then retrieve the data
      const response = await getAllBooks();

      setBooks(response.books);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <>
        <Stack direction="row">
          <Text fontSize="2xl">Loading...</Text>
          <Spinner size="lg" />
        </Stack>
      </>
    );
  }

  // suggestion: make the UI even better by not using tables, try to use cards
  return (
    <>
      <TableContainer p="20px">
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontSize="15px" color="black">
                No
              </Th>
              <Th fontSize="15px" color="black">
                Title
              </Th>
              <Th fontSize="15px" color="black">
                Author
              </Th>
              <Th fontSize="15px" color="black">
                Publisher
              </Th>
              <Th fontSize="15px" color="black">
                Year
              </Th>
              <Th fontSize="15px" color="black">
                Pages
              </Th>
              <Th fontSize="15px" color="black">
                Image
              </Th>
              <Th fontSize="15px" color="black">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Link
                      color="blue.400"
                      href={`http://localhost:3000/books/${book.id}`}
                    >
                      {book.title}
                    </Link>
                  </Td>
                  <Td>{book.author}</Td>
                  <Td>{book.publisher}</Td>
                  <Td>{book.year}</Td>
                  <Td>{book.pages}</Td>
                  <Td>
                    <Image
                      boxSize="150px"
                      objectFit="contain"
                      src={`http://localhost:3000/${book.image}`}
                      fallbackSrc="https://via.placeholder.com/150"
                    />
                  </Td>
                  <Td>
                    <Stack>
                      <Button
                        color="white"
                        bgColor="gray.500"
                        onClick={() => router.push(`/books/${book.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          router.push(`/books/${book.id}/delete`);
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Center>
        <Button
          bgGradient="linear(to-l, black, blue.700)"
          boxShadow="sm"
          color="white"
          onClick={() => router.push("/books/create")}
          mb="100px"
        >
          Add New Book
        </Button>
      </Center>
    </>
  );
}
