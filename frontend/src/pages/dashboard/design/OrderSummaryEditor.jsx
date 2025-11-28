import { useState } from 'react';
import useDesignStore from '../../../store/designStore';
import { Save } from 'lucide-react';

const OrderSummaryEditor = ({ storeId }) => {
    const { orderSummaryConfig, setOrderSummaryConfig, updateOrderSummaryConfig } = useDesignStore();
    const [saving, setSaving] = useState(false);

    const config = orderSummaryConfig || {
        title: 'Thank you for your order!',
        message: 'We have received your order and will contact you shortly.',
    };

    const handleSave = async () => {
        setSaving(true);
        await updateOrderSummaryConfig(storeId, config);
        setSaving(false);
    };

    const updateConfig = (updates) => {
        setOrderSummaryConfig({ ...config, ...updates });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Order Summary Page</h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Page Title</label>
                    <input
                        type="text"
                        value={config.title}
                        onChange={(e) => updateConfig({ title: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Success Message</label>
                    <textarea
                        rows={4}
                        value={config.message}
                        onChange={(e) => updateConfig({ message: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        This message will be displayed to the customer after a successful order.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryEditor;
