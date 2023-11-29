import prisma from "@/lib/prisma";
import {
  Container,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";

async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });

    if (!book) {
      throw {
        name: "BookNotFound",
        message: "Book with the provided ID not found",
      };
    }

    return book;
  } catch (error) {
    throw new Error(error);
  }
}

export default async function BookDetail({ params }) {
  const { id } = params;
  const book = await getBookById(+id);

  return (
    <Container
      bgGradient="linear(to-l, blue.700, black)"
      boxShadow="xl"
      maxW="5xl"
      px="30px"
      pt="30px"
      pb="25px"
      my="40px"
    >
      <Card colorScheme="red" direction={{ base: "column", sm: "row" }} overflow="hidden" variant='filled'>
        <Image
          objectFit="contain"
          maxW={{ base: "100%", sm: "200px" }}
          ml="5"
          src={`http://localhost:3000/${book.image}`}
          fallbackSrc="https://via.placeholder.com/200"
        />

        <Stack>
          <CardBody>
            <Heading size="lg">{book.title}</Heading>

            <Text mt="3">
              <strong>Author:</strong> {book.author}
            </Text>
            <Text mt="1">
              <strong>Publisher:</strong> {book.publisher}
            </Text>
            <Text mt="1">
              <strong>Year:</strong> {book.year}
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
    </Container>
  );
}
