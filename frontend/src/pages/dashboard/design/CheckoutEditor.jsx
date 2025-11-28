import { useState } from 'react';
import useDesignStore from '../../../store/designStore';
import { Save } from 'lucide-react';

const CheckoutEditor = ({ storeId }) => {
    const { checkoutConfig, setCheckoutConfig, updateCheckoutConfig } = useDesignStore();
    const [saving, setSaving] = useState(false);

    // Default config if null
    const config = checkoutConfig || {
        fields: {
            phone: { visible: true, required: true },
            email: { visible: true, required: true },
            address: { visible: true, required: true },
            notes: { visible: true, required: false },
        },
        shipping: {
            pickup: { enabled: true, label: 'Store Pickup', fee: 0 },
            delivery: { enabled: true, label: 'Home Delivery', fee: 50 },
        }
    };

    const handleSave = async () => {
        setSaving(true);
        await updateCheckoutConfig(storeId, config);
        setSaving(false);
    };

    const updateField = (field, updates) => {
        const newConfig = {
            ...config,
            fields: {
                ...config.fields,
                [field]: { ...config.fields[field], ...updates }
            }
        };
        setCheckoutConfig(newConfig);
    };

    const updateShipping = (method, updates) => {
        const newConfig = {
            ...config,
            shipping: {
                ...config.shipping,
                [method]: { ...config.shipping[method], ...updates }
            }
        };
        setCheckoutConfig(newConfig);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Checkout Configuration</h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Form Fields */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h4 className="text-md font-medium text-gray-900 mb-4">Customer Information</h4>
                <div className="space-y-4">
                    {Object.entries(config.fields).map(([key, field]) => (
                        <div key={key} className="flex items-center justify-between">
                            <span className="capitalize text-gray-700">{key}</span>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => updateField(key, { required: e.target.checked })}
                                        className="rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-500">Required</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={field.visible}
                                            onChange={(e) => updateField(key, { visible: e.target.checked })}
                                        />
                                        <div className={`block w-10 h-6 rounded-full ${field.visible ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${field.visible ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shipping Options */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h4 className="text-md font-medium text-gray-900 mb-4">Shipping Options</h4>
                <div className="space-y-6">
                    {Object.entries(config.shipping).map(([key, method]) => (
                        <div key={key} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className="capitalize font-medium text-gray-700">{key}</span>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={method.enabled}
                                            onChange={(e) => updateShipping(key, { enabled: e.target.checked })}
                                        />
                                        <div className={`block w-10 h-6 rounded-full ${method.enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${method.enabled ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                </label>
                            </div>
                            {method.enabled && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Label</label>
                                        <input
                                            type="text"
                                            value={method.label}
                                            onChange={(e) => updateShipping(key, { label: e.target.value })}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Fee</label>
                                        <input
                                            type="number"
                                            value={method.fee}
                                            onChange={(e) => updateShipping(key, { fee: parseFloat(e.target.value) })}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckoutEditor;
