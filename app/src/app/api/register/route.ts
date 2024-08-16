import User from "@/db/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function POST(request: Request) {
  try {
    const body: {
      username: string;
      name: string;
      password: string;
      email: string;
    } = await request.json();
    const findEmail = await User.findUserByEmail(body.email);
    if (findEmail) {
      return NextResponse.json(
        {
          message: "Email is already registered",
        },
        {
          status: 400,
        }
      );
    }
    const findUsername = await User.findUserByUsername(body.username);
    if (findUsername) {
      return NextResponse.json(
        {
          message: "Username is already registered",
        },
        {
          status: 400,
        }
      );
    }
    await User.create({
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json(
      {
        message: "Register success",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;
      return NextResponse.json(
        {
          message: `${errPath} ${errMessage.toLocaleLowerCase()}`,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
