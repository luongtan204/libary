import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../features/products/cartSlice";
import { Link } from "react-router";

// import { Link } from "react-router";

export default function CartModal({ isOpen, onClose }) {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-2xl h-auto bg-white rounded-lg py-2 px-1">
        <div className="text-right">
          <button
            onClick={onClose}
            className="text-white rounded-sm bg-red-800 cursor-pointer"
          >
            X
          </button>
        </div>
        <div>
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

          {items.length == 0 && (
            <div className="text-black text-center">
              Không có gì trong giỏ hàng
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="text-right">
            <Link to="/checkout">
              <button
                className="bg-green-800 rounded-sm p-2 cursor-pointer"
                onClick={onClose}
              >
                Thanh toán
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
