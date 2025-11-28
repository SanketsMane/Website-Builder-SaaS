import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStoreStore from '../../../store/storeStore';
import api from '../../../api/axios';
import { Eye } from 'lucide-react';

const OrderList = () => {
    const { currentStore } = useStoreStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentStore) return;
            setLoading(true);
            try {
                const res = await api.get(`/stores/${currentStore.id}/orders`);
                setOrders(res.data);
            } catch (error) {
                console.error('Failed to fetch orders');
            }
            setLoading(false);
        };
        fetchOrders();
    }, [currentStore]);

    if (!currentStore) return <div>Please select a store.</div>;
    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No orders yet.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{order.id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.customerName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.total}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/dashboard/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                                            <Eye className="h-5 w-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
