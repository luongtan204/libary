import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../features/products/ProductSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";
export default function ProductUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    id: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = dispatch(updateProduct(formData));
    if (response) {
      toast.success("Cập nhật sản phẩm thành công");
      navigate("/");
    } else {
      toast.error("Cập nhật sản phẩm thất bại");
    }
  };

  useEffect(() => {
    dispatch(getProductById(id))
      .unwrap()
      .then((existingProduct) => {
        if (existingProduct) {
          setFormData(existingProduct);
        }
      });
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/"> &larr; Quay lai</Link>
      <div>
        <h1 className="text-4xl text-green-700 font-extrabold text-center">
          EDIT PRODUCT
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-2 mt-5">
            <label
              htmlFor="name"
              className="text-xl font-bold  col-span-3 text-center"
            >
              Tên:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="col-span-9 border border-gray-500 rounded-md p-2 mr-5"
              value={formData.name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="grid grid-cols-12 gap-2 mt-5">
            <label
              htmlFor="price"
              className="text-xl font-bold  col-span-3 text-center"
            >
              Giá:
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="col-span-9 border border-gray-500 rounded-md p-2 mr-5"
              value={formData.price}
              onChange={handleChangeInput}
            />
          </div>
          <div className="grid grid-cols-12 gap-2 mt-5">
            <label
              htmlFor="description"
              className="text-xl font-bold  col-span-3 text-center"
            >
              Mô tả:
            </label>
            <textarea
              rows={4}
              name="description"
              id="description"
              className="col-span-9 border border-gray-500 rounded-md p-2 mr-5"
              value={formData.description}
              onChange={handleChangeInput}
            />
          </div>
          <div className="text-center mt-5">
            <button
              className="bg-yellow-500 text-white font-semibold p-2 rounded-lg text-center"
              type="submit"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
