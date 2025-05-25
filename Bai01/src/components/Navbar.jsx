import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Product Management
          </Link>
          <div className="flex items-center space-x-4">
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
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">
                Xin chào, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 