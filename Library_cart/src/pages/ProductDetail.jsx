import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { getProductById } from "../features/products/productSlice";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id))
      .unwrap()
      .then((existingProduct) => {
        if (existingProduct) {
          setProduct(existingProduct);
        }
      });
  }, [dispatch, id]);

  return (
    <div className="text-left">
      <Link to="/" className="hover:underline text-green-800 text-left">
        {" "}
        &larr; Quay lại
      </Link> 
      <div className="text-left">
        {loading && <p>Đang tải dữ liệu...</p>}

        {!loading && product && (
          <div className="grid grid-cols-2  gap-3  py-3">
            <div className="w-[500px] h-[500px]">
              <img
                className="w-full h-full object-cover"
                src={`/public/images/${product?.image}`}
              />
            </div>
            <div className="text-left">
              <p className="text-3xl mb-3">{product.name}</p>
              <p className="text-green-800 font-bold text-xl mb-3">
                {product.price.toLocaleString()} VNĐ
              </p>
              <p className="text-slate-500 mb-5">{product.description}</p>
              <Link
                to={`/edit/${product.id}`}
                className="!mt-10 bg-green-800 font-semibold px-5 text-white p-2 rounded-sm"
              >
                Chỉnh sửa
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
