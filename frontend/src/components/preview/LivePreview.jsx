import { useEffect, useState } from 'react';
import useDesignStore from '../../store/designStore';

const LivePreview = ({ store, mode }) => {
    const { homepageConfig } = useDesignStore();

    // In a real implementation, this would likely be an iframe pointing to the public store URL
    // with a special 'preview' query param or postMessage communication.
    // For now, we'll render a mock representation of the store.

    if (!homepageConfig) return <div className="flex items-center justify-center h-full">Loading Preview...</div>;

    return (
        <div className={`h-full w-full bg-white overflow-y-auto ${mode === 'mobile' ? 'text-sm' : ''}`}>
            {/* Header */}
            {homepageConfig.sections?.find(s => s.type === 'header' && s.visible) && (
                <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-xl text-indigo-600">{store.name}</h1>
                        <div className="flex space-x-4 text-gray-600">
                            <span>Home</span>
                            <span>Products</span>
                            <span>Cart</span>
                        </div>
                    </div>
                </header>
            )}

            {/* Banner */}
            {homepageConfig.sections?.find(s => s.type === 'banner' && s.visible) && (
                <div className="bg-indigo-600 text-white py-12 px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">
                        {homepageConfig.sections.find(s => s.type === 'banner').title || 'Welcome'}
                    </h2>
                    <p className="text-indigo-100">
                        {homepageConfig.sections.find(s => s.type === 'banner').subtitle || 'Best products for you'}
                    </p>
                </div>
            )}

            {/* Products */}
            {homepageConfig.sections?.find(s => s.type === 'products' && s.visible) && (
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                        {homepageConfig.sections.find(s => s.type === 'products').title || 'Featured Products'}
                    </h3>
                    <div className={`grid gap-4 ${mode === 'mobile' ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
                                <div className="h-32 bg-gray-200 w-full"></div>
                                <div className="p-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            {homepageConfig.sections?.find(s => s.type === 'footer' && s.visible) && (
                <footer className="bg-gray-50 p-8 text-center text-gray-500 border-t border-gray-200 mt-8">
                    <p>&copy; {new Date().getFullYear()} {store.name}</p>
                </footer>
            )}
        </div>
    );
};

export default LivePreview;
