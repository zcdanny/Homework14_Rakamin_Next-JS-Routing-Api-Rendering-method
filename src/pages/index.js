import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { VStack, Wrap } from "@chakra-ui/react";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Book from "../components/Books";
import Navbar from "@/components/navbar";
import { ChakraProvider } from "@chakra-ui/react";
export default function Home(props) {
  return (
    <ChakraProvider>
      <Navbar />
      {props?.book?.map((book) => (
        <Book key={`${book.id} ${book.title}`} {...book} />
      ))}
    </ChakraProvider>
  );
}

export async function getServerSideProps() {
  try {
    const book = await prisma.book.findMany();
    return {
      props: {
        book,
      },
    };
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: 400 },
      { message: "Something went wrong" }
    );
  }
}
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
// import { VStack, Wrap } from "@chakra-ui/react";
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import Book from "../components/Books";
// import Navbar from "@/components/navbar";
// import Homepage from "./Homepage";
// import { ChakraProvider } from "@chakra-ui/react";
// export default function Home(props) {
//   return (
//     <ChakraProvider>
//       <VStack minH="100vh" minW="99vw" bg="#0c3b2e">
// <Router>
//   <Navbar />
//   <Routes>
//     <Route path={"/"} element={<Homepage />} />
//     <Route path={"/register"} element={<Register />} />
//     <Route path={"/newbook"} element={<NewBookPage />} />
//     <Route path={"/books/:id"} element={<BookDetails />} />
//     <Route path={"/editbook/:id"} element={<EditBookPage />} />
//   </Routes>
// </Router>
//       </VStack>
//     </ChakraProvider>
//   );
// }
