import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, getCartTotal } = useCartStore();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={toggleCart}></div>
            <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                                <div className="ml-3 h-7 flex items-center">
                                    <button
                                        onClick={toggleCart}
                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Close panel</span>
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                {items.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-4 text-gray-500">Your cart is empty.</p>
                                    </div>
                                ) : (
                                    <div className="flow-root">
                                        <ul className="-my-6 divide-y divide-gray-200">
                                            {items.map((item) => (
                                                <li key={item.id} className="py-6 flex">
                                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                        <img
                                                            src={item.image || 'https://via.placeholder.com/150'}
                                                            alt={item.title}
                                                            className="w-full h-full object-center object-cover"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>{item.title}</h3>
                                                                <p className="ml-4">{item.price}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 flex items-end justify-between text-sm">
                                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="p-1 hover:bg-gray-100"
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </button>
                                                                <span className="px-2">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="p-1 hover:bg-gray-100"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </button>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => removeItem(item.id)}
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {items.length > 0 && (
                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>{getCartTotal().toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
