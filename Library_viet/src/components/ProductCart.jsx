import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../features/products/ProductSlice";
export default function ProductCart(props) {
  const { product } = props;
  // console.log(product);
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (
      window.confirm(`Bạn có chắc muốn xóa sản phẩm ${product.name} không?`)
    ) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg relative ">
      <div className="w-full h-60 overflow-hidden">
        <img
          src={`/public/images/${product.image}`}
          alt=""
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold">{product.name}</div>
        <div className="mb-2 text-green-600 text-xl">
          {product.price.toLocaleString()}VND
        </div>
        <div className="text-slate-500 truncate">{product.description}</div>
      </div>
      <div className="grid grid-cols-2 gap-10 p-3">
        <Link
          to={`/edit/${product.id}`}
          className="bg-yellow-500 text-white font-semibold p-2 rounded-lg text-center"
        >
          Chinh sua
        </Link>
        <Link
          to={`/product/${product.id}`}
          className="bg-green-700 text-white font-semibold p-2 rounded-lg text-center"
        >
          xem chi tiet
        </Link>
      </div>
      <div className="text-white absolute top-0 right-0 bg-red-500 p-2 rounded-full w-10 h-10 font-bold text-xl items-center text-center">
        <button className="text-center" onClick={handleDelete}>
          X
        </button>
      </div>
    </div>
  );
}
