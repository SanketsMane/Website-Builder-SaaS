import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useStoreStore from '../../../store/storeStore';
import api from '../../../api/axios';
import { ArrowLeft } from 'lucide-react';

const OrderDetail = () => {
    const { id } = useParams(); // Order ID
    const { currentStore } = useStoreStore();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!currentStore) return;
            setLoading(true);
            try {
                const res = await api.get(`/stores/${currentStore.id}/orders/${id}`);
                setOrder(res.data);
            } catch (error) {
                console.error('Failed to fetch order');
            }
            setLoading(false);
        };
        fetchOrder();
    }, [currentStore, id]);

    const handleStatusChange = async (newStatus) => {
        setUpdating(true);
        try {
            const res = await api.put(`/stores/${currentStore.id}/orders/${id}/status`, { status: newStatus });
            setOrder({ ...order, status: res.data.status });
        } catch (error) {
            console.error('Failed to update status');
        }
        setUpdating(false);
    };

    if (loading) return <div>Loading order...</div>;
    if (!order) return <div>Order not found.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/dashboard/orders" className="mr-4 text-gray-500 hover:text-gray-700">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(-6).toUpperCase()}</h1>
                </div>
                <div>
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={updating}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Customer Info */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Information</h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerName}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerEmail}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerPhone}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Shipping address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.shippingAddress}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Order Items</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {order.items.map((item) => (
                                <li key={item.id} className="px-4 py-4 sm:px-6 flex items-center">
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-indigo-600 truncate">Product ID: {item.productId}</p>
                                            <p className="text-sm text-gray-500">{item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between items-center">
                            <span className="font-medium text-gray-900">Shipping ({order.shippingMethod})</span>
                            <span className="font-medium text-gray-900">{order.shippingCost}</span>
                        </div>
                        <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-gray-900">{order.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
