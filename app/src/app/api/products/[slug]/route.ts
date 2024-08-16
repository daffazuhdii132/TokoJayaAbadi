import Product from "@/db/models/Product";
import { NextResponse } from "next/server";

type BySlugParams = {
  params: {
    slug: string;
  };
};

export async function GET(request: Request, { params }: BySlugParams) {
  try {
    let data = await Product.findBySlug(params.slug);
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
