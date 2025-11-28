import { useState, useEffect } from 'react';
import useStoreStore from '../../store/storeStore';
import { Save } from 'lucide-react';

const StoreSettings = () => {
    const { store, updateStore, loading } = useStoreStore();
    const [formData, setFormData] = useState({
        name: '',
        primaryColor: '#4f46e5',
        layout: 'grid',
    });

    useEffect(() => {
        if (store) {
            setFormData({
                name: store.name,
                primaryColor: store.theme?.primaryColor || '#4f46e5',
                layout: store.theme?.layout || 'grid',
            });
        }
    }, [store]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateStore({
            name: formData.name,
            theme: {
                primaryColor: formData.primaryColor,
                layout: formData.layout,
            },
        });
    };

    if (!store) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Store Settings</h1>

            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">General</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme & Appearance</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                                <div className="mt-1 flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={formData.primaryColor}
                                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                                        className="h-10 w-20 p-1 rounded border border-gray-300"
                                    />
                                    <span className="text-sm text-gray-500">{formData.primaryColor}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Layout</label>
                                <select
                                    value={formData.layout}
                                    onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="grid">Grid View</option>
                                    <option value="list">List View</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreSettings;
