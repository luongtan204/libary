import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../features/orders/OrderSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [note, setNote] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);

  const handleItemChange = (idx, field, value) => {
    const newItems = [...items];
    newItems[idx][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    try {
      await dispatch(addOrder({
        customerName,
        note,
        items,
        total,
        status: 'Pending',
        createdAt: new Date().toISOString()
      })).unwrap();
      toast.success('Thêm đơn hàng thành công!');
      navigate('/');
    } catch {
      toast.error('Thêm đơn hàng thất bại!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Thêm đơn hàng mới</h1>
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
        <div>
          <h2 className="font-semibold mb-2">Sản phẩm</h2>
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded flex-1"
                placeholder="Tên sản phẩm"
                value={item.name}
                onChange={e => handleItemChange(idx, 'name', e.target.value)}
                required
              />
              <input
                className="border p-2 rounded w-20"
                type="number"
                min="1"
                placeholder="Số lượng"
                value={item.quantity}
                onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
                required
              />
              <input
                className="border p-2 rounded w-28"
                type="number"
                min="0"
                placeholder="Giá"
                value={item.price}
                onChange={e => handleItemChange(idx, 'price', Number(e.target.value))}
                required
              />
              <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={handleAddItem} className="text-blue-500">+ Thêm sản phẩm</button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Thêm đơn hàng</button>
      </form>
    </div>
  );
};

export default AddOrder;