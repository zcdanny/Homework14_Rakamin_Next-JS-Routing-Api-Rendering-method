import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (req, { params }) => {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { status: 400 },
        { message: "Invalid credentials" }
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { status: 400 },
        { message: "Invalid credentials" }
      );
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return NextResponse.json({ token });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: 400 },
      { message: "Invalid credentials" }
    );
  }
};
