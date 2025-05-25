import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault();
    const response = dispatch(addProduct(formData));
    if (response) {
      toast.success("Thêm thành công");
      navigate("/");
    } else {
      toast.error("Thêm thất bại");
    }
  };

  return (
    <div>
      <div className="text-left">
        <Link to="/" className=" hover:underline text-green-800 ">
          {" "}
          &larr; Quay lại
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Add product
      </h1>

      <form className="flex flex-col gap-6" onSubmit={onFinish}>
        <div className="grid grid-cols-12 items-center gap-3">
          <label htmlFor="name" className="col-span-3 font-semibold  text-xl">
            Tên
          </label>
          <input
            className="col-span-9 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="grid grid-cols-12 items-center gap-3">
          <label htmlFor="price" className="col-span-3 font-semibold text-xl">
            Giá
          </label>
          <input
            className="col-span-9 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChangeInput}
            required
            min="0"
          />
        </div>

        <div className="grid grid-cols-12 items-start gap-3">
          <label
            htmlFor="description"
            className="col-span-3 font-semibold text-xl pt-2"
          >
            Mô tả
          </label>
          <textarea
            className="col-span-9 p-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChangeInput}
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-md shadow-md transition hover:cursor-pointer"
          >
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
}
