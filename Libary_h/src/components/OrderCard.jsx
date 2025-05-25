import React from 'react';
import { Link } from 'react-router-dom';

function OrderCard({ order, onDelete }) {
  return (
    <div className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
          <p className="text-gray-600">{order.customerName}</p>
          <p className="text-sm text-gray-500">{order.createdAt}</p>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded text-sm ${
            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {order.status}
          </span>
          <p className="mt-2 font-semibold">
            {order.total.toLocaleString('vi-VN')}đ
          </p>
          <div className="mt-2 flex gap-2">
            <Link to={`/orders/${order.id}`} className="text-blue-500 underline">Chi tiết</Link>
            <Link to={`/orders/${order.id}/edit`} className="text-green-500 underline">Sửa</Link>
            <button
              onClick={() => onDelete(order.id)}
              className="text-red-500 underline"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;