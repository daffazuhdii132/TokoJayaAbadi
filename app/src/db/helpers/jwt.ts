import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;
import * as jose from "jose";

function signToken(payload: { _id: string; email: string; username: string }) {
  return jwt.sign(payload, JWT_SECRET);
}

export const verifyJose = async <T>(payload: string) => {
  const secretKey = new TextEncoder().encode(JWT_SECRET);
  const payloadJose = await jose.jwtVerify<T>(payload, secretKey);
  return payloadJose.payload;
};

export { signToken };
