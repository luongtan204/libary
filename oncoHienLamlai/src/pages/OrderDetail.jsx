import React from 'react'
import useFetch from '../hooks/useFetch'
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateOrderStatus } from '../features/orders/OrderSlice';
import { toast } from 'react-toastify'; // Thêm dòng này

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = `https://67ff3c6458f18d7209f06c43.mockapi.io/ok/${id}`;
  const { data: order, loading, error } = useFetch(url);

  const handleStatusChange = async (e) => {
    try {
      await dispatch(updateOrderStatus({ id, status: e.target.value,order })).unwrap();
      toast.success('Cập nhật trạng thái thành công!');
     
    } catch (err) {
      toast.error('Cập nhật trạng thái thất bại!');
    }
  };

  if (loading) return(
  <div className="flex justify-center items-center h-40">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="ml-3 text-blue-500">Đang tải...</span>
  </div>);
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!order) return <div className="text-center p-4">Không tìm thấy đơn hàng</div>;
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Quay lại
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Đơn hàng #{order.id}</h1>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="p-2 border rounded"
          >
            <option value="Pending">Đang chờ</option>
            <option value="Processing">Đang xử lý</option>
            <option value="Delivered">Đã giao</option>
            <option value="Cancelled">Đã hủy</option>
          </select>
        </div>

        <div className="grid gap-6">
          {/* Thông tin khách hàng */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-2">Thông tin khách hàng</h2>
            <p className="text-gray-600">Tên: {order.customerName}</p>
            <p className="text-gray-600">Ngày đặt: {order.createdAt}</p>
            {order.note && (
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Ghi chú:</span> {order.note}
              </p>
            )}
          </div>

          {/* Danh sách sản phẩm */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Danh sách sản phẩm</h2>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Tổng tiền:</span>
              <span className="text-xl font-bold text-blue-600">
                {order.total.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail