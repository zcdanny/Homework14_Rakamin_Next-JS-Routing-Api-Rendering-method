import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json({ book });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { status: 400 },
      { message: "Something went wrong" }
    );
  }
};

export const POST = async (req, { params }) => {
  try {
    const { id } = req.params;
    const { title, author, publisher, year, pages } = req.body;
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        publisher,
        year,
        pages,
      },
    });
    return NextResponse.json({ book });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: 400 },
      { message: "Something went wrong" }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ book });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { status: 400 },
      { message: "Something went wrong" }
    );
  }
};
