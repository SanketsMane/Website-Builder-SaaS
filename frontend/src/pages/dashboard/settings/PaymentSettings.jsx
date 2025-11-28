import { useState } from 'react';

const PaymentSettings = () => {
    const [codEnabled, setCodEnabled] = useState(true);

    return (
        <div className="space-y-6 max-w-lg">
            <div>
                <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
                <p className="mt-1 text-sm text-gray-500">Configure how your customers pay you.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900">Cash on Delivery (COD)</h4>
                        <p className="text-sm text-gray-500">Allow customers to pay when they receive their order.</p>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={codEnabled}
                            onChange={(e) => setCodEnabled(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 opacity-50 cursor-not-allowed">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900">Stripe Integration</h4>
                        <p className="text-sm text-gray-500">Accept credit card payments directly.</p>
                    </div>
                    <button disabled className="px-3 py-1 bg-gray-300 text-gray-600 text-xs rounded-md">
                        Coming Soon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSettings;
