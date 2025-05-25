import React from "react";
import useFetch from "../../hooks/useFetch";
import ProductCart from "../../components/ProductCart";

export default function ProductList() {
  const { data, loading, error } = useFetch("http://localhost:3000/products");
  if (loading) {
    return <div className="text-4xl font-bold text-red-500">LOADING...</div>;
  }
  if (loading && error.trim !== "") {
    alert(error);
  }
  //console.log(data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {data?.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
}
