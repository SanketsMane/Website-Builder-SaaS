import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import useStoreStore from '../../../store/storeStore';
import useDesignStore from '../../../store/designStore';
import { Layout, ShoppingCart, FileText, CheckCircle, Smartphone, Monitor } from 'lucide-react';
import HomepageEditor from './HomepageEditor';
import CheckoutEditor from './CheckoutEditor';
import OrderSummaryEditor from './OrderSummaryEditor';
import CustomPagesEditor from './CustomPagesEditor';
import LivePreview from '../../../components/preview/LivePreview';

const DesignLayout = () => {
    const { currentStore } = useStoreStore();
    const { fetchDesignConfigs } = useDesignStore();
    const location = useLocation();
    const [previewMode, setPreviewMode] = useState('mobile'); // 'mobile' or 'desktop'

    useEffect(() => {
        if (currentStore) {
            fetchDesignConfigs(currentStore.id);
        }
    }, [currentStore, fetchDesignConfigs]);

    if (!currentStore) return <div>Please select a store first.</div>;

    const tabs = [
        { name: 'Homepage', path: '', icon: Layout },
        { name: 'Checkout', path: 'checkout', icon: ShoppingCart },
        { name: 'Order Summary', path: 'order-summary', icon: CheckCircle },
        { name: 'Custom Pages', path: 'pages', icon: FileText },
    ];

    return (
        <div className="flex h-[calc(100vh-64px)] -m-4 sm:-m-6 lg:-m-8">
            {/* Left Sidebar - Editor */}
            <div className="w-1/3 min-w-[350px] bg-white border-r border-gray-200 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 overflow-x-auto">
                    {tabs.map((tab) => {
                        const isActive = location.pathname.endsWith(tab.path ? `/${tab.path}` : '/design');
                        return (
                            <Link
                                key={tab.name}
                                to={tab.path}
                                className={`flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 whitespace-nowrap ${isActive
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex flex-col items-center">
                                    <tab.icon className="h-5 w-5 mb-1" />
                                    {tab.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Editor Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <Routes>
                        <Route index element={<HomepageEditor storeId={currentStore.id} />} />
                        <Route path="checkout" element={<CheckoutEditor storeId={currentStore.id} />} />
                        <Route path="order-summary" element={<OrderSummaryEditor storeId={currentStore.id} />} />
                        <Route path="pages" element={<CustomPagesEditor storeId={currentStore.id} />} />
                    </Routes>
                </div>
            </div>

            {/* Right Side - Preview */}
            <div className="flex-1 bg-gray-100 flex flex-col">
                {/* Preview Toolbar */}
                <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-center space-x-4">
                    <button
                        onClick={() => setPreviewMode('mobile')}
                        className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Smartphone className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setPreviewMode('desktop')}
                        className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Monitor className="h-5 w-5" />
                    </button>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-hidden flex items-center justify-center p-8">
                    <div
                        className={`bg-white shadow-2xl transition-all duration-300 overflow-hidden ${previewMode === 'mobile'
                                ? 'w-[375px] h-[667px] rounded-3xl border-8 border-gray-800'
                                : 'w-full h-full rounded-lg border border-gray-200'
                            }`}
                    >
                        <LivePreview store={currentStore} mode={previewMode} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignLayout;
