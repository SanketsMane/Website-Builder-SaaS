import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import usePublicStoreStore from '../../store/publicStoreStore';
import useCartStore from '../../store/cartStore';
import { ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const { store } = usePublicStoreStore();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!store) return;
            try {
                // Assuming we are fetching by ID for now as per route structure
                // In a real scenario, we might want to fetch by slug if the route was /product/:slug
                // But since we are reusing the public store logic, we can try to fetch from the public endpoint
                // However, the public endpoint is /:subdomain/products/:slug
                // If 'id' param is actually an ID, we might need a different endpoint or filter client side if we already have products
                // For simplicity, let's assume we can fetch by ID or we just use the public endpoint if 'id' is treated as slug

                // Let's try to find the product in the store's products if already loaded, otherwise fetch
                // Since we don't have a direct "get product by ID" public endpoint in the previous steps (only by slug),
                // let's assume for this MVP we fetch all and find, OR we update backend to support ID.
                // Actually, let's just use the public products endpoint and filter for now to be safe without changing backend too much
                // OR better, let's assume the route param is 'id' and we use the existing getPublicProduct which takes a slug.
                // If the user clicks from StoreHome, they pass an ID.
                // Let's just fetch the specific product using the ID if we can, or just fetch all and find.

                // Workaround: Fetch all public products for this store and find by ID
                const res = await api.get(`/public/${store.username}/products`);
                const found = res.data.find(p => p.id === id);
                setProduct(found);
            } catch (error) {
                console.error('Failed to fetch product');
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id, store]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
            </Link>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image */}
                <div className="flex-shrink-0">
                    <img
                        src={product.image || 'https://via.placeholder.com/400'}
                        alt={product.title}
                        className="w-full h-full object-center object-cover rounded-lg shadow-sm"
                    />
                </div>

                {/* Info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">{product.price} {store.currency}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>
                        <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>

                    <div className="mt-10 flex">
                        <button
                            onClick={() => addItem(product)}
                            className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                        >
                            Add to bag
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
