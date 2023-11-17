import { Box, Center } from "@chakra-ui/react";
import BookForm from "@/components/BookForm";
import Navbar from "@/components/navbar";
import { ChakraProvider } from "@chakra-ui/react";
export default function NewBookPage() {
  return (
    <ChakraProvider>
      <Navbar />
      <Center>
        <Box>
          <BookForm />
        </Box>
      </Center>
    </ChakraProvider>
  );
}
