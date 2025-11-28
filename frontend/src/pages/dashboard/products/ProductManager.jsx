import { useState, useEffect } from 'react';
import useStoreStore from '../../../store/storeStore';
import useProductStore from '../../../store/productStore';
import { FileSpreadsheet, RefreshCw, ExternalLink, Trash2, Image as ImageIcon } from 'lucide-react';

const ProductManager = () => {
    const { currentStore, fetchStores } = useStoreStore();
    const { products, fetchProducts, connectSheet, syncProducts, disconnectSheet, loading } = useProductStore();
    const [activeTab, setActiveTab] = useState('manage');

    useEffect(() => {
        if (currentStore) {
            fetchProducts(currentStore.id);
        }
    }, [currentStore, fetchProducts]);

    const handleConnect = async () => {
        if (!currentStore) return;
        await connectSheet(currentStore.id);
        fetchStores(); // Refresh store data to get sheet info
    };

    const handleSync = async () => {
        if (!currentStore) return;
        await syncProducts(currentStore.id);
        fetchProducts(currentStore.id);
    };

    const handleDisconnect = async () => {
        if (!currentStore) return;
        if (window.confirm('Are you sure? This will stop syncing products.')) {
            await disconnectSheet(currentStore.id);
            fetchStores();
        }
    };

    if (!currentStore) return <div>Please select a store.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveTab('manage')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'manage' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Manage
                    </button>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'gallery' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Gallery
                    </button>
                </div>
            </div>

            {activeTab === 'manage' && (
                <div className="space-y-6">
                    {/* Connection Status */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-full ${currentStore.sheetId ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    <FileSpreadsheet className={`h-6 w-6 ${currentStore.sheetId ? 'text-green-600' : 'text-gray-500'}`} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {currentStore.sheetId ? 'Google Sheet Connected' : 'Connect Google Sheet'}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {currentStore.sheetId
                                            ? `Last synced: ${currentStore.sheetLastSyncedAt ? new Date(currentStore.sheetLastSyncedAt).toLocaleString() : 'Never'}`
                                            : 'Sync your products directly from a Google Sheet.'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                {currentStore.sheetId ? (
                                    <div className="flex space-x-3">
                                        <a
                                            href={currentStore.sheetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Open Sheet
                                        </a>
                                        <button
                                            onClick={handleSync}
                                            disabled={loading}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                        >
                                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                            {loading ? 'Syncing...' : 'Force Sync'}
                                        </button>
                                        <button
                                            onClick={handleDisconnect}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleConnect}
                                        disabled={loading}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                                    >
                                        Connect Sheet
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {products.length === 0 ? (
                                <li className="px-6 py-12 text-center text-gray-500">
                                    No products found. {currentStore.sheetId ? 'Try syncing your sheet.' : 'Connect a sheet to get started.'}
                                </li>
                            ) : (
                                products.map((product) => (
                                    <li key={product.id}>
                                        <div className="px-4 py-4 sm:px-6 flex items-center">
                                            <div className="h-12 w-12 flex-shrink-0">
                                                <img className="h-12 w-12 rounded-md object-cover" src={product.image || 'https://via.placeholder.com/150'} alt="" />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-indigo-600 truncate">{product.title}</p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {product.price} {currentStore.currency}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">Image Gallery</h3>
                    <p>Manage your product images here. (Coming Soon)</p>
                </div>
            )}
        </div>
    );
};

export default ProductManager;
