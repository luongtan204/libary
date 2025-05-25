import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateOrderStatus } from '../features/orders/OrderSlice';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';

const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = `https://67ff3c6458f18d7209f06c43.mockapi.io/ok/${id}`;
  const { data: order, loading, error } = useFetch(url);

  const [customerName, setCustomerName] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName || '');
      setNote(order.note || '');
      setStatus(order.status || 'Pending');
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateOrderStatus({
          id,
          status,
          order: { ...order, customerName, note, status }
        })
      ).unwrap();
      toast.success('Cập nhật đơn hàng thành công!');
      navigate('/');
    } catch {
      toast.error('Cập nhật đơn hàng thất bại!');
    }
  };

  if (loading) return <div className="text-center p-4">Đang tải đơn hàng...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!order) return <div className="text-center p-4">Không tìm thấy đơn hàng</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Chỉnh sửa đơn hàng #{order.id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Tên khách hàng"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          required
        />
        <textarea
          className="border p-2 rounded w-full"
          placeholder="Ghi chú"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Pending">Đang chờ</option>
          <option value="Processing">Đang xử lý</option>
          <option value="Delivered">Đã giao</option>
          <option value="Cancelled">Đã hủy</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default EditOrder;

