import ProductCard from "../../components/ProductCard";
import useFetch from "../../hooks/useFetch";

export default function ProductList() {
  const { data, loading, error } = useFetch("http://localhost:3000/products");

  if (loading) {
    return <div>Đang tải nhe... </div>;
  }

  if (loading && error.trim() !== "") {
    alert(error);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
