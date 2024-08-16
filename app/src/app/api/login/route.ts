import { comparePassword } from "@/db/helpers/bcrypt";
import { signToken } from "@/db/helpers/jwt";
import User from "@/db/models/User";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();
    const findEmail = await User.findUserByEmail(body.email);
    if (!findEmail) {
      return Response.json(
        { message: "Invalid email / password" },
        { status: 400 }
      );
    }
    const passwordCorrect = comparePassword(body.password, findEmail.password);
    if (!passwordCorrect) {
      return Response.json(
        { message: "Invalid email / password" },
        { status: 400 }
      );
    }
    let token = signToken({
      _id: findEmail._id.toString(),
      email: findEmail.email,
      username: findEmail.username,
    });
    cookies().set("Authorization", `Bearer ${token}`);
    return Response.json({ access_token: token });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Error" }, { status: 500 });
  }
}
