"use client";
import WishlistCard from "@/components/ui/WishlistCard";
import { useEffect, useState } from "react";

type ProductType = {
  _id: string;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  thumbnail: string;
  images: string[];
  price: number;
  tags: string[];
};
type Wishlist = {
  _id: string;
  productDetail: ProductType;
};
export default function Wishlist() {
  const [wishlistData, setWishlistData] = useState([]);
  console.log("wishlist page");
  async function getWishlist() {
    const res = await fetch("http://localhost:3000/api/wishlist/");
    const { data } = await res.json();
    setWishlistData(data);
    console.log(data);
  }

  useEffect(() => {
    getWishlist();
  }, []);
  if (wishlistData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1>Wishlist is empty</h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {wishlistData.map((wishlist: Wishlist, index) => (
        <WishlistCard key={index} product={wishlist} />
      ))}
    </div>
  );
}
