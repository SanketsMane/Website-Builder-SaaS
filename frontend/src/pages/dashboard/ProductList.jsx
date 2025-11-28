import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../../store/productStore';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const ProductList = () => {
    const { products, fetchProducts, deleteProduct, loading } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    if (loading && products.length === 0) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link
                    to="/dashboard/products/new"
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {products.length === 0 ? (
                        <li className="px-6 py-12 text-center text-gray-500">
                            No products yet. Click "Add Product" to get started.
                        </li>
                    ) : (
                        products.map((product) => (
                            <li key={product.id}>
                                <div className="px-4 py-4 flex items-center sm:px-6">
                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="h-12 w-12 object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center">
                                                        <ImageIcon className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium text-indigo-600 truncate">{product.title}</p>
                                                <p className="text-gray-500 text-sm">${product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                                        <Link
                                            to={`/dashboard/products/${product.id}`}
                                            className="p-2 text-gray-400 hover:text-indigo-600"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-gray-400 hover:text-red-600"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ProductList;
