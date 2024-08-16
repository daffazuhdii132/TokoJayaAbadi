"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddWishlistButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  async function addWishlist() {
    const res = await fetch("http://localhost:3000/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (!res.ok) {
      return Swal.fire({
        title: "Error!",
        text: `${response.message}`,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    Swal.fire({
      title: "Success!",
      text: `${response.data}`,
      icon: "success",
      confirmButtonText: "Close",
    });
    router.push("/");
  }
  return (
    <button
      onClick={async () => {
        addWishlist();
        console.log(productId);
      }}
      className="btn btn-primary"
    >
      Add to wishlist
    </button>
  );
}
