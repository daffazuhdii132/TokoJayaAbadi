import CarouselBanner from "@/components/ui/carousel-banner";
import HeroHomePage from "@/components/ui/hero-homepage";
import LampDemo from "@/components/ui/lamp";
import { StickyScrollRevealDemo } from "@/components/ui/sticky-example";
import React from "react";

export type Product = {
  _id: string;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  thumbnail: string;
  images: string[];
  price: number;
};

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const products: { data: Product[] } = await response.json();
  const featProducts: Product[] = [
    products.data[0],
    products.data[4],
    products.data[5],
    products.data[7],
    products.data[13],
  ];
  // console.log(products.data);

  return (
    <main className="">
      <HeroHomePage />
      <div className="mt-10">
        <CarouselBanner />
      </div>
      <StickyScrollRevealDemo products={featProducts} />

      <LampDemo />
    </main>
  );
}
