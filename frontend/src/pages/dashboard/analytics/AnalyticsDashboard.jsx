import { useState, useEffect } from 'react';
import useStoreStore from '../../../store/storeStore';
import api from '../../../api/axios';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

const AnalyticsDashboard = () => {
    const { currentStore } = useStoreStore();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!currentStore) return;
            setLoading(true);
            try {
                const res = await api.get(`/stores/${currentStore.id}/analytics`);
                setStats(res.data);
            } catch (error) {
                console.error('Failed to fetch analytics');
            }
            setLoading(false);
        };
        fetchStats();
    }, [currentStore]);

    if (!currentStore) return <div>Please select a store.</div>;
    if (loading) return <div>Loading analytics...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Revenue */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <DollarSign className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <ShoppingBag className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{stats?.totalOrders || 0}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Products */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <TrendingUp className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{stats?.totalProducts || 0}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
                </div>
                <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {(stats?.recentOrders || []).length === 0 ? (
                            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No recent orders.</li>
                        ) : (
                            (stats?.recentOrders || []).map((order) => (
                                <li key={order.id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-indigo-600 truncate">
                                            Order #{order.id.slice(-6).toUpperCase()}
                                        </p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                {order.customerName}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>
                                                {order.total}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
