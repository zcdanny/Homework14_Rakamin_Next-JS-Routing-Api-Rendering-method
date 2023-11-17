import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { writeFile } from "fs/promises";
import path from "path";

export const GET = async (req, { params }) => {
  try {
    const book = await prisma.book.findMany();
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
  // ambil data dari formData
  const data = await req.formData();
  // abil gambar dari form bernama "image"
  const file = data.get("image");
  //conversi file ke buffer
  const bytes = await file.arraybuffer();
  const buffer = Buffer.from(bytes);
  // penyimpanan file
  const fileName = Date.now() + file.name;
  const pathFile = `/image/` + file.name;
  const finalPath = path.join(process.cwd(), `/app/`, pathFile);
  await writeFile(finalPath, buffer);
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year: parseInt(year),
        pages: parseInt(pages),
        image: req.file.path,
      },
    });
    return NextResponse.json({ book });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(
      { status: 400 },
      { message: "Book already exist" }
    );
  }
};
