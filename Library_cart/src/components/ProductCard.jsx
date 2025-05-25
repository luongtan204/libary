import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { deleteProductById } from "../features/products/productSlice";
import { addToCart } from "../features/products/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (
      window.confirm(`Bạn có chắc muốn xoá sản phẩm "${product.name}" không?`)
    ) {
      dispatch(deleteProductById(product.id));
    }
  };

  return (
    <div className="group border border-gray-300 shadow-lg rounded-lg relative hover:cursor-pointer">
      <div className="w-full h-60 rounded-t-lg overflow-hidden">
        <img
          src={`/public/images/${product.image}`}
          alt={`Ảnh sản phẩm ${product.name}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="text-left mt-2">
          <p className="text-4xl font-bold mb-4">{product.name}</p>
          <p className="text-green-800 font-bold text-2xl mb-2">
            {product.price.toLocaleString()} VNĐ
          </p>
          <p className="text-slate-500 truncate">{product.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Link
            to={`/edit/${product.id}`}
            className="p-3 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
          >
            Chỉnh sửa
          </Link>
          <Link
            to={`/product/${product.id}`}
            className="p-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition"
          >
            Xem chi tiết
          </Link>
          <div className="py-5 text-center">
            <button
              className="p-2 bg-green-700 text-white rounded-sm cursor-pointer"
              onClick={() => dispatch(addToCart(product))}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <button
          className="bg-red-600 text-white font-semibold text-xl absolute right-0 top-0 rounded-full w-[40px] h-[40px] z-9 shadow-2xl hover:cursor-pointer hover:bg-red-700 leading-[40px] hover:scale-105 transition-transform duration-300"
          onClick={handleDelete}
          aria-label={`Xóa sản phẩm ${product.name}`}
        >
          X
        </button>
      </div>
    </div>
  );
}
