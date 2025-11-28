import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import usePublicStoreStore from '../../store/publicStoreStore';
import useCartStore from '../../store/cartStore';
import { ShoppingBag, Image as ImageIcon } from 'lucide-react';

const StoreHome = ({ subdomain }) => {
    const { store } = useOutletContext();
    const { products, fetchStoreProducts, loading } = usePublicStoreStore();
    const { toggleCart, getItemCount } = useCartStore();

    useEffect(() => {
        if (subdomain) {
            fetchStoreProducts(subdomain);
        }
    }, [subdomain, fetchStoreProducts]);

    if (loading) return <div>Loading products...</div>;
    if (!store) return <div>Loading store details...</div>;

    const primaryColor = store.theme?.primaryColor || '#4f46e5';
    const isGrid = store.theme?.layout === 'grid';

    return (
        <div>
            {/* Header with Cart Button */}
            <header className="bg-white shadow-sm sticky top-0 z-10 mb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
                    <button onClick={toggleCart} className="relative p-2 text-gray-600 hover:text-gray-900">
                        <ShoppingBag className="h-6 w-6" />
                        {getItemCount() > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                {getItemCount()}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 px-4 sm:px-6 lg:px-8">Latest Products</h2>

            <div className="px-4 sm:px-6 lg:px-8 pb-12">
                {products.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No products available.</p>
                ) : (
                    <div className={isGrid ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className={`block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden ${!isGrid && 'flex'}`}
                            >
                                <div className={`${isGrid ? 'h-48' : 'w-48 h-48'} bg-gray-200 flex-shrink-0`}>
                                    {product.image ? (
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                                        <p className="mt-1 text-gray-500 line-clamp-2">{product.description}</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-lg font-bold" style={{ color: primaryColor }}>
                                            {store.currency} {product.price}
                                        </span>
                                        <span className="text-sm text-indigo-600 font-medium hover:underline">
                                            View Details
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoreHome;
