import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStoreStore from '../../store/storeStore';
import useAuthStore from '../../store/authStore';
import { Check, Store, Layout, Globe, ArrowRight, Loader, AlertCircle, X } from 'lucide-react';

const CreateStoreWizard = () => {
    const navigate = useNavigate();
    const { templates, fetchTemplates, createStore, loading, error } = useStoreStore();
    const { isAuthenticated, user } = useAuthStore();
    const [step, setStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState('MULTI_PURPOSE');
    const [templatesLoading, setTemplatesLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        currency: 'USD',
        receiveWhatsApp: false,
        receiveEmail: true,
        receiveSheet: false,
        whatsappNumber: '',
        orderEmail: user?.email || '',
    });
    const [createdStore, setCreatedStore] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const loadTemplates = async () => {
                setTemplatesLoading(true);
                try {
                    await fetchTemplates();
                } catch (err) {
                    console.error('Failed to load templates:', err);
                } finally {
                    setTemplatesLoading(false);
                }
            };
            loadTemplates();
        }
    }, [fetchTemplates, isAuthenticated]);

    useEffect(() => {
        if (user?.email && !formData.orderEmail) {
            setFormData(prev => ({ ...prev, orderEmail: user.email }));
        }
    }, [user?.email, formData.orderEmail]);

    const handleCreate = async () => {
        if (!formData.name) return;
        try {
            const store = await createStore({
                ...formData,
                template: selectedTemplate,
            });
            setCreatedStore(store);
            setStep(3);
        } catch (err) {
            // Error handled by store
        }
    };

    const renderStep1 = () => {
        if (templatesLoading) {
            return (
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                        <p className="mt-2 text-gray-600">Loading available templates...</p>
                    </div>
                    <div className="flex justify-center py-12">
                        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
                    </div>
                </div>
            );
        }

        if (error && templates.length === 0) {
            return (
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md max-w-md mx-auto">
                            <div className="flex items-center justify-center">
                                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                <p className="text-red-700 text-sm">Failed to load templates</p>
                            </div>
                            <button
                                onClick={() => fetchTemplates()}
                                className="mt-2 w-full text-red-600 hover:text-red-800 underline text-sm"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                    <p className="mt-2 text-gray-600">Select a starting point for your store. You can customize everything later.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${selectedTemplate === template.id 
                            ? 'border-indigo-500 bg-indigo-50 shadow-lg scale-105' 
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${selectedTemplate === template.id ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                                <Layout className={`h-6 w-6 ${selectedTemplate === template.id ? 'text-indigo-600' : 'text-gray-500'}`} />
                            </div>
                            {selectedTemplate === template.id && (
                                <div className="p-1 bg-indigo-600 rounded-full">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                        <h3 className={`text-lg font-semibold ${selectedTemplate === template.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                            {template.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">{template.description}</p>
                        
                        {selectedTemplate === template.id && (
                            <div className="absolute inset-0 rounded-xl ring-2 ring-indigo-500 ring-opacity-50"></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <button
                    onClick={() => setStep(2)}
                    disabled={!selectedTemplate}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </div>
        </div>
    );
    };

    const renderStep2 = () => (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Store Configuration</h2>
                <p className="mt-2 text-gray-600">Set up your store details and choose how you want to receive orders.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}

            <div className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900">Store Name *</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="e.g., My Awesome Store"
                        required
                    />
                    <p className="text-xs text-gray-500">This will be displayed to your customers</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900">Currency</label>
                    <select
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                        <option value="USD">🇺🇸 USD ($)</option>
                        <option value="EUR">🇪🇺 EUR (€)</option>
                        <option value="INR">🇮🇳 INR (₹)</option>
                        <option value="GBP">🇬🇧 GBP (£)</option>
                    </select>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-base">Order Notifications</h4>
                    <p className="text-sm text-gray-600">Choose how you want to receive new orders from customers</p>

                    <div className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    checked={formData.receiveEmail}
                                    onChange={(e) => setFormData({ ...formData, receiveEmail: e.target.checked })}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <label className="font-medium text-gray-700 flex items-center">
                                    📧 Email Notifications
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        Recommended
                                    </span>
                                </label>
                                <p className="text-gray-600 text-sm">
                                    Get instant email notifications when customers place orders.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-green-50">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    checked={formData.receiveWhatsApp}
                                    onChange={(e) => setFormData({ ...formData, receiveWhatsApp: e.target.checked })}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <label className="font-medium text-gray-700 flex items-center">
                                    💬 WhatsApp Integration
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        Popular
                                    </span>
                                </label>
                                <p className="text-gray-600 text-sm">
                                    Let customers place orders directly through WhatsApp messaging.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    checked={formData.receiveSheet}
                                    onChange={(e) => setFormData({ ...formData, receiveSheet: e.target.checked })}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <label className="font-medium text-gray-700 flex items-center">
                                    Google Sheets Integration
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        New
                                    </span>
                                </label>
                                <p className="text-gray-500 text-sm">
                                    Automatically sync all orders to a Google Sheet for easy tracking and management.
                                </p>
                                {formData.receiveSheet && (
                                    <div className="mt-3 p-3 bg-blue-50 rounded-md">
                                        <p className="text-sm text-blue-700">
                                            📊 After creating your store, you'll be able to connect to Google Sheets in your dashboard settings.
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            Features: Real-time sync, order details, customer info, and analytics.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-6 border-t">
                    <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={loading || !formData.name.trim()}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin h-4 w-4 mr-2" />
                                Creating Store...
                            </>
                        ) : (
                            <>
                                🚀 Create Store
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="max-w-xl mx-auto text-center space-y-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Your store is ready! 🎉</h2>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Your store URL:</p>
                <div className="flex items-center justify-center space-x-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-lg font-mono text-indigo-600">
                        {window.location.protocol}//{createdStore?.username}.{window.location.host.split('.').slice(1).join('.') || 'localhost:5173'}
                    </code>
                    <a
                        href={`${window.location.protocol}//${createdStore?.username}.${window.location.host.split('.').slice(1).join('.') || 'localhost:5173'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600"
                    >
                        <Globe className="h-5 w-5" />
                    </a>
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Go to Dashboard
                </button>
                <button
                    onClick={() => navigate('/dashboard/design')}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Start Designing
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    );
};

export default CreateStoreWizard;
