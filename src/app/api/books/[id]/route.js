import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { title, author, publisher, year, pages } = await req.json();
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    const book = await prisma.book.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ book });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json({ book });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
