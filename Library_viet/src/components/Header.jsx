import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between p-4 shadow-md items-center">
      <div className="text-green-700 font-extrabold text-4xl font-serif">
        PRODUCT MANAGER
      </div>
      <Link
        to={`/add`}
        className="bg-orange-500 text-white font-bold p-2 rounded-lg"
      >
        Them san pham
      </Link>
    </div>
  );
}
