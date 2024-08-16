import AddWishlistButton from "@/components/ui/addWishlistButton";
import addWishlistButton from "@/components/ui/addWishlistButton";
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

function ProductCard({ product }: { product: ProductType }) {
  return (
    <div data-theme="light" className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.thumbnail}
          width={"100"}
          height={"100"}
          alt="Picture of product"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>
          {product.excerpt}
          <br /> {product.description}
        </p>

        <div className="card-actions justify-end">
          <AddWishlistButton productId={product._id} />
          {/* <button className="btn btn-primary">Add to wishlist</button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
