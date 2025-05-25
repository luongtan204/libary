import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`http://localhost:3000/products/${id}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl text-gray-600 mb-4">${product.price}</p>
        <p className="text-gray-500 mb-6">{product.description}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
