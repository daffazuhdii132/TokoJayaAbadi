import ProductCard from "@/components/ui/ProductCard";

type PageProps = {
  params: { slug: string };
};
export default async function ProductDetail(props: PageProps) {
  const { slug } = props.params;
  const res = await fetch("http://localhost:3000/api/products/" + slug);
  const { data } = await res.json();
  console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProductCard product={data} />
    </div>
  );
}
