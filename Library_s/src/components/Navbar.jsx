import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Product Management
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Products
            </Link>
            <Link
              to="/add"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 