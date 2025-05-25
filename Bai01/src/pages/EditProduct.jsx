import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../features/products/productSlice';
import useFetch from '../hooks/useFetch';

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: product, loading, error: fetchError } = useFetch(`http://localhost:3000/products/${id}`);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');

  const validateImageUrl = (url) => {
    if (!url) return true; 
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes('.jpg') || 
           lowerUrl.includes('.jpeg') || 
           lowerUrl.includes('.png') || 
           lowerUrl.includes('.webp') ||
           lowerUrl.includes('.gif');
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        image: product.image || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'image') {
      if (value && !validateImageUrl(value)) {
        setImageError('URL phải chứa đuôi .jpg, .jpeg, .png, .webp hoặc .gif');
      } else {
        setImageError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.image && !validateImageUrl(formData.image)) {
      setImageError('URL phải chứa đuôi .jpg, .jpeg, .png, .webp hoặc .gif');
      return;
    }

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await dispatch(updateProduct({ id, product: productData })).unwrap();
      navigate('/');
    } catch (err) {
      setError('Không thể cập nhật sản phẩm. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (fetchError) {
    return <div className="text-red-500 text-center">{fetchError}</div>;
  }

  if (!product) {
    return <div className="text-center">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Chỉnh Sửa Sản Phẩm</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Tên Sản Phẩm
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Giá
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Mô Tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="image">
            URL Hình Ảnh
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Nhập URL hình ảnh (.jpg, .jpeg, .png, .webp, .gif)"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imageError && <div className="text-red-500 mt-1">{imageError}</div>}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Cập Nhật Sản Phẩm
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
