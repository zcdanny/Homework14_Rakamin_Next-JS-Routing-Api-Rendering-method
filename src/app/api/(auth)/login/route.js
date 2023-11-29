import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req, { params }) => {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("False email");
      throw { name: "InvalidCredentials" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      cookies().set({
        name: "accessToken",
        value: token,
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ token });
    } else {
      console.log("False password");
      throw { name: "InvalidCredentials" };
    }
  } catch (error) {
    console.log(error);

    if (error.name === "InvalidCredentials") {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
};
