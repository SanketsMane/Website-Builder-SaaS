import { useState, useEffect } from 'react';
import useStoreStore from '../../../store/storeStore';
import api from '../../../api/axios';
import { Trash2, Plus } from 'lucide-react';

const CouponList = () => {
    const { currentStore } = useStoreStore();
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        code: '',
        type: 'PERCENTAGE',
        value: '',
        minAmount: '',
        maxUses: '',
    });

    useEffect(() => {
        const fetchCoupons = async () => {
            if (!currentStore) return;
            setLoading(true);
            try {
                const res = await api.get(`/stores/${currentStore.id}/coupons`);
                setCoupons(res.data);
            } catch (error) {
                console.error('Failed to fetch coupons');
            }
            setLoading(false);
        };
        fetchCoupons();
    }, [currentStore]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/stores/${currentStore.id}/coupons`, formData);
            setCoupons([res.data, ...coupons]);
            setShowForm(false);
            setFormData({ code: '', type: 'PERCENTAGE', value: '', minAmount: '', maxUses: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create coupon');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/stores/${currentStore.id}/coupons/${id}`);
            setCoupons(coupons.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete coupon');
        }
    };

    if (!currentStore) return <div>Please select a store.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Coupon
                </button>
            </div>

            {showForm && (
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Code</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="e.g. SAVE10"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="PERCENTAGE">Percentage (%)</option>
                                    <option value="FIXED_AMOUNT">Fixed Amount</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Value</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="10"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Min Order Amount (Optional)</label>
                                <input
                                    type="number"
                                    value={formData.minAmount}
                                    onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Coupon
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {coupons.length === 0 ? (
                        <li className="px-6 py-4 text-center text-sm text-gray-500">No coupons yet.</li>
                    ) : (
                        coupons.map((coupon) => (
                            <li key={coupon.id} className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-indigo-600">{coupon.code}</h3>
                                    <p className="text-sm text-gray-500">
                                        {coupon.type === 'PERCENTAGE' ? `${coupon.value}% off` : `-${coupon.value} off`}
                                        {coupon.minAmount ? ` (Min: ${coupon.minAmount})` : ''}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(coupon.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CouponList;
