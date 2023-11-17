import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookForm from "@/components/BookForm";
import { getBookDetailById } from "@/modules/fetch";
import { ChakraProvider } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
export default function EditBookPage() {
  const router = useRouter();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(router.query.id);
        setBook(response.book);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [router.query.id]);

  return (
    <ChakraProvider>
      <Navbar />
      <Center>
        <BookForm bookData={book} />;
      </Center>
    </ChakraProvider>
  );
}
