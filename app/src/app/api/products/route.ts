import Product from "@/db/models/Product";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("masuk getallproducts");

    const data = await Product.getAllProducts();

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.log(error);

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
