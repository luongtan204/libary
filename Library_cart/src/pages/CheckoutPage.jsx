import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
} from "../features/products/cartSlice";
// import { useNavigate } from "react-router";
import { createDeliveryOrder } from "../features/products/deliveryOrderSlice";

export default function CheckoutPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
  });
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const order = {
      ...formData,
      totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      items,
    };
    dispatch(createDeliveryOrder(order));
    dispatch(clearCart());
    // setFormData([]);
    //navigate("/");
  };

  console.log("items", items);

  if (items.length === 0) {
    // navigate("/");
    console.log("loi", items);
  }

  return (
    <div className="py-4 ">
      <h1 className="text-center text-3xl text-green-800 mb-5">Thanh toán</h1>
      <div className="max-w-2xl mx-auto text-xl">
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <div className="flex gap-3 items-center">
            <div className="grid grid-cols-2">
              <label htmlFor="customerName">Tên</label>
              <input
                type="text"
                name="customerName"
                className="border border-gray-700 rounded-sm outline-none"
                onChange={handleChange}
                value={formData.customerName}
              />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="grid grid-cols-2">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                name="address"
                className="border border-gray-700 rounded-sm outline-none"
                onChange={handleChange}
                value={formData.address}
              />
            </div>
          </div>
          {items.length > 0 && (
            <div className="text-black">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 gap-5 space-y-5"
                >
                  <div className="col-span-1 h-32">
                    <img
                      src={`/public/images/${product.image}`}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-green-800 font-semibold">
                      {product.price}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="border border-gray-600 rounded-md flex justify-center items-center w-6 h-6"
                        onClick={() => dispatch(decreaseQuantity(product))}
                      >
                        -
                      </button>
                      <p>{product.quantity}</p>
                      <button
                        className="border border-gray-600 rounded-md flex justify-center items-center w-6 h-6"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p>
            Tổng tiền: {items.reduce((sum, i) => sum + i.price * i.quantity, 0)}
          </p>

          <div className="text-center">
            <button className="text-white bg-green-700 rounded-sm p-2">
              Thanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
