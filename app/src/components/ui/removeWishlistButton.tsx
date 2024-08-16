"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RemoveWishListButton({ _id }: { _id: string }) {
  const router = useRouter();
  async function removeWishlist() {
    const res = await fetch("http://localhost:3000/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wishlistId: _id,
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
      text: `${response.message}`,
      icon: "success",
      confirmButtonText: "Close",
    });
    router.push("/");
  }
  return (
    <button
      onClick={async () => {
        removeWishlist();
        console.log(_id);
      }}
      className="btn btn-primary"
    >
      Remove from wishlist
    </button>
  );
}
