import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../features/products/ProductSlice";
import { Link } from "react-router-dom";
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const { loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id))
      .unwrap()
      .then((existingProduct) => {
        console.log(`existingProduct`, existingProduct);
        setProduct(existingProduct);
      });
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/"> &larr; Quay lai</Link>
      {loading && <div className="text-2xl text-red-500">Loading...</div>}
      {!loading && product && (
        <div className="grid grid-cols-2 shadow-lg p-4 border border-gray-300 rounded-lg m-10">
          <div className="w-100 h-100 rounded-lg shadow-lg">
            <img
              src={`/public/images/${product.image}`}
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <div className="text-2xl font-bold mb-5">{product.name}</div>
            <div className=" text-green-600 text-xl mb-5">
              {product.price.toLocaleString()}VND
            </div>
            <div className="text-slate-500 mb-5">{product.description}</div>
            <Link
              to={`/edit/${product.id}`}
              className="bg-yellow-500 text-white font-semibold p-2 rounded-lg text-center"
            >
              Chinh sua
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
