import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, setStatusFilter, deleteOrder } from '../orders/OrderSlice';
import { toast } from 'react-toastify';
import OrderCard from '../../components/OrderCard';

const OrderList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);


    const { items, loading, error, statusFilter } = useSelector((state) => state.orders);
    const filteredOrders = statusFilter === 'all'
        ? items
        : items.filter(order => order.status === statusFilter);
    const handleStatusFilter =(e)=>{
        dispatch(setStatusFilter(e.target.value))
    }
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
            try {
                await dispatch(deleteOrder(id)).unwrap();
                toast.success('Xóa đơn hàng thành công!');
            } catch {
                toast.error('Xóa đơn hàng thất bại!');
            }
        }
    };
    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <select
                        value={statusFilter}
                        onChange={handleStatusFilter}
                        className="p-2 border rounded"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="Pending">Đang chờ</option>
                        <option value="Processing">Đang xử lý</option>
                        <option value="Delivered">Đã giao</option>
                        <option value="Cancelled">Đã hủy</option>
                    </select>
                </div>
                <div className="flex justify-end mb-4">
                    <Link to="/orders/add" className="bg-blue-500 text-white px-4 py-2 rounded">
                        + Thêm đơn hàng
                    </Link>
                </div>

                <div className="grid gap-4">
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </>

    )
}

export default OrderList