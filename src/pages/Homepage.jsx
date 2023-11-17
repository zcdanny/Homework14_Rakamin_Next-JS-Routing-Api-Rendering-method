import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { VStack, Wrap } from "@chakra-ui/react";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Book from "../components/Books";
import Navbar from "@/components/navbar";
import { ChakraProvider } from "@chakra-ui/react";

export default function Homepage(props) {
  return (
      {props?.book?.map((book) => (
        <Book key={`${book.id} ${book.title}`} {...book} />
      ))}
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
