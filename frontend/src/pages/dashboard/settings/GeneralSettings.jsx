import { useState, useEffect } from 'react';
import useStoreStore from '../../../store/storeStore';
import api from '../../../api/axios';

const GeneralSettings = () => {
    const { currentStore, fetchStores } = useStoreStore();
    const [formData, setFormData] = useState({
        name: '',
        currency: 'USD',
        passwordProtected: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentStore) {
            setFormData({
                name: currentStore.name || '',
                currency: currentStore.currency || 'USD',
                passwordProtected: currentStore.passwordProtected || false,
            });
        }
    }, [currentStore]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/stores/${currentStore.id}`, formData);
            await fetchStores(); // Refresh stores to update global state
            alert('Settings saved successfully');
        } catch (error) {
            alert('Failed to save settings');
        }
        setLoading(false);
    };

    if (!currentStore) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                </select>
            </div>

            <div className="flex items-center">
                <input
                    id="passwordProtected"
                    type="checkbox"
                    checked={formData.passwordProtected}
                    onChange={(e) => setFormData({ ...formData, passwordProtected: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="passwordProtected" className="ml-2 block text-sm text-gray-900">
                    Password Protect Store (Maintenance Mode)
                </label>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
};

export default GeneralSettings;
