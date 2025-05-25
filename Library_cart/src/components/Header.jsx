import { useState } from "react";
import { Link, NavLink } from "react-router";
import CartModal from "./CartModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex justify-between items-center p-4 shadow-md rounded-md bg-white">
      <Link
        to="/"
        className="text-2xl text-green-800 font-serif font-extrabold hover:text-green-900 transition-colors duration-200"
      >
        PRODUCT MANAGEMENT
      </Link>
      <NavLink
        to="/add"
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-md px-5 py-2 transition-colors duration-200 shadow-md"
      >
        Add
      </NavLink>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-800 text-white font-bold px-4 py-1 rounded-lg"
      >
        Cart
      </button>
      <CartModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </header>
  );
}
