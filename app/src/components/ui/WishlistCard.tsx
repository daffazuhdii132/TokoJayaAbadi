import RemoveWishListButton from "./removeWishlistButton";
type ProductType = {
  _id: string;
  productDetail: {
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
};

function WishlistCard({ product }: { product: ProductType }) {
  return (
    <div data-theme="light" className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.productDetail.thumbnail}
          width={"100"}
          height={"100"}
          alt="Picture of product"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.productDetail.name}</h2>
        <p>
          {product.productDetail.excerpt}
          <br /> {product.productDetail.description}
        </p>

        <div className="card-actions justify-end">
          <RemoveWishListButton _id={product._id} />
          {/* <button className="btn btn-primary">Add to wishlist</button> */}
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
