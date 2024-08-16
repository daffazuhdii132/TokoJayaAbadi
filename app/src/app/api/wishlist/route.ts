import Wishlist from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body: { wishlistId: string } = await request.json();
    await Wishlist.deleteById(body.wishlistId);
    return NextResponse.json({ message: "Wishlist deleted" });
  } catch (error) {
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
export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-id");
    const data = await Wishlist.findByUserId(userId as string);
    return NextResponse.json({
      data,
    });
  } catch (error) {
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

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-id");
    const body: { productId: string } = await request.json();
    const findWishlist = await Wishlist.findByProductId({
      productId: body.productId,
      userId: userId as string,
    });
    if (findWishlist) {
      return NextResponse.json(
        {
          message: "Product already in wishlist",
        },
        {
          status: 400,
        }
      );
    }
    const newWishlist = await Wishlist.create({
      productId: new ObjectId(String(body.productId)),
      userId: new ObjectId(String(userId)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({
      data: newWishlist,
    });
  } catch (error) {
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
