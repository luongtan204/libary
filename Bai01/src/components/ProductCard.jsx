import { Link } from 'react-router-dom';

function ProductCard({ product, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <p className="text-gray-500 mb-4">{product.description}</p>
        <div className="flex justify-between">
          <Link
            to={`/product/${product.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Details
          </Link>
          <div className="space-x-2">
            <Link
              to={`/edit/${product.id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;