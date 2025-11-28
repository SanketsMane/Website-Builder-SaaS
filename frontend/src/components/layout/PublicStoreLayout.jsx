import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import usePublicStoreStore from '../../store/publicStoreStore';
import { ShoppingBag } from 'lucide-react';
import CartDrawer from '../public/CartDrawer';

const PublicStoreLayout = ({ subdomain }) => {
    const { store, fetchStoreBySubdomain, loading, error } = usePublicStoreStore();

    useEffect(() => {
        if (subdomain) {
            fetchStoreBySubdomain(subdomain);
        }
    }, [subdomain, fetchStoreBySubdomain]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    if (!store) return null;

    const primaryColor = store.theme?.primaryColor || '#4f46e5';

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <CartDrawer />
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            {store.logo ? (
                                <img src={store.logo} alt={store.name} className="h-8 w-auto" />
                            ) : (
                                <ShoppingBag className="h-8 w-8" style={{ color: primaryColor }} />
                            )}
                            <h1 className="ml-3 text-xl font-bold text-gray-900">{store.name}</h1>
                        </div>
                        <nav className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Banner */}
            {store.banner && (
                <div className="h-64 w-full object-cover">
                    <img src={store.banner} alt="Store Banner" className="w-full h-full object-cover" />
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet context={{ store }} />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} {store.name}. Powered by StoreBuilder.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PublicStoreLayout;
