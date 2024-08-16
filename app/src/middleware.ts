import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyJose } from "./db/helpers/jwt";

export async function middleware(request: NextRequest) {
  const authorization = cookies().get("Authorization");
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    if (!authorization?.value) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const [type, token] = authorization.value.split(" ");
    if (type !== "Bearer") {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }
    const decoded = await verifyJose<{
      _id: string;
      email: string;
      username: string;
    }>(token);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-id", decoded._id);
    requestHeaders.set("x-email", decoded.email);
    requestHeaders.set("x-username", decoded.username);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ["/api/wishlist/:paths*"],
};
