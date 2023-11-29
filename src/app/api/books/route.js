import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";

export const POST = async (req, { params }) => {
  const data = await req.formData();
  const { title, author, publisher, year, pages, image } =
    Object.fromEntries(data);

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const imageName =
    Date.now() + "-" + image.name.toLowerCase().split(" ").join("-");
  const path = `./public/uploads/${imageName}`;
  await writeFile(path, buffer);
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year: parseInt(year),
        pages: parseInt(pages),
        image: `./uploads/${imageName}`, // add the path to the uploaded image to the book data
      },
    });
    return NextResponse.json({ book });
  } catch (error) {
    console.log("err", error);
    return NextResponse.json(
      { message: "Book already exists" },
      { status: 400 }
    );
  }
};

export const GET = async (req, { params }) => {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
  }
};
