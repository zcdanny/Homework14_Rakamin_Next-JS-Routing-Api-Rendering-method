import {
  useToast,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Box,
  Image,
  VStack,
  Wrap,
  WrapItem,
  InputGroup,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "@/modules/fetch";
// import { createBook, editBook } from "../modules/fetch";
import { RiCornerDownRightFill } from "react-icons/ri";
export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Flex>
      <Box
        bg="#6d9773"
        color="white"
        borderRadius="lg"
        m={{ sm: 4, md: 16, lg: 10 }}
        p={{ sm: 5, md: 5, lg: 16 }}
      >
        <Box px={100}>
          <Box>
            <Heading align="center">
              {bookData ? "EDIT BOOK" : "ADD BOOK"}
            </Heading>
          </Box>
          <Box bg="white" borderRadius="lg">
            <Box m={8} color="#0B0E3F">
              <form onSubmit={handleSubmit}>
                <VStack spacing={5} minW={700}>
                  <HStack minW={700}>
                    <FormControl>
                      <FormLabel mt={5}>Title</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <RiCornerDownRightFill color="gray.800" />
                        </InputLeftElement>
                        <Input
                          type="text"
                          name="title"
                          defaultValue={bookData?.title}
                          size="md"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel mt={5}>Year</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <RiCornerDownRightFill color="gray.800" />
                        </InputLeftElement>
                        <Input
                          type="number"
                          name="year"
                          defaultValue={bookData?.year}
                          size="md"
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>
                  <HStack minW={700}>
                    <FormControl>
                      <FormLabel mt={5}>Author</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <RiCornerDownRightFill color="gray.800" />
                        </InputLeftElement>
                        <Input
                          type="text"
                          name="author"
                          defaultValue={bookData?.author}
                          size="md"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel mt={5}>Publisher</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <RiCornerDownRightFill color="gray.800" />
                        </InputLeftElement>
                        <Input
                          type="text"
                          name="publisher"
                          defaultValue={bookData?.publisher}
                          size="md"
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>
                  <FormControl align="center">
                    <FormLabel mt={5}>Pages</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <RiCornerDownRightFill color="gray.800" />
                      </InputLeftElement>
                      <Input
                        type="number"
                        name="pages"
                        defaultValue={bookData?.pages}
                        size="md"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="image" isRequired>
                    {selectedImage && (
                      <Image w={64} src={selectedImage} alt="Selected Image" />
                    )}
                    {!bookData?.image && (
                      <FormControl>
                        <FormLabel mb={5}>Image</FormLabel>
                        <Input
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                          }}
                        />
                      </FormControl>
                    )}
                  </FormControl>
                  <FormControl align="center">
                    <Button
                      m={5}
                      variant="solid"
                      colorScheme="teal"
                      _hover={{}}
                      type="submit"
                    >
                      {bookData ? "Edit Book" : "Add Book"}
                    </Button>
                  </FormControl>
                </VStack>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
