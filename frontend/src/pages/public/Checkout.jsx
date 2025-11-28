import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import usePublicStoreStore from '../../store/publicStoreStore';
import api from '../../api/axios';

const Checkout = () => {
    const { items, getCartTotal, clearCart } = useCartStore();
    const { store } = usePublicStoreStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [shippingMethod, setShippingMethod] = useState(null);

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(null);
    const [couponError, setCouponError] = useState('');

    if (!store || items.length === 0) {
        return <div className="p-8 text-center">Your cart is empty.</div>;
    }

    const checkoutConfig = store.checkoutConfig || {
        fields: {
            phone: { visible: true, required: true },
            email: { visible: true, required: true },
            address: { visible: true, required: true },
        },
        shipping: {
            delivery: { enabled: true, label: 'Home Delivery', fee: 50 },
        }
    };

    const shippingOptions = Object.entries(checkoutConfig.shipping)
        .filter(([_, opt]) => opt.enabled)
        .map(([key, opt]) => ({ id: key, ...opt }));

    const subtotal = getCartTotal();
    const shippingCost = shippingMethod ? shippingMethod.fee : 0;
    const totalBeforeDiscount = subtotal + shippingCost;
    const total = discount ? totalBeforeDiscount - discount.amount : totalBeforeDiscount;

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setCouponError('');
        try {
            const res = await api.post(`/public/${store.username}/coupons/validate`, {
                code: couponCode,
                cartTotal: subtotal,
            });
            setDiscount({
                code: res.data.code,
                amount: res.data.discountAmount,
            });
        } catch (error) {
            setDiscount(null);
            setCouponError(error.response?.data?.message || 'Invalid coupon');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!shippingMethod) {
            alert('Please select a shipping method');
            return;
        }

        setLoading(true);
        try {
            // Assuming subdomain is available in store object or URL
            const subdomain = store.username; // or from window.location
            await api.post(`/public/${subdomain}/orders`, {
                items,
                customer: formData,
                shippingMethod,
                total,
            });
            clearCart();
            navigate('/order-success');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Failed to place order. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                {/* Order Summary (Mobile: Top, Desktop: Right) */}
                <div className="mt-10 lg:mt-0 lg:col-start-2">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                    <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <ul className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-6 px-4 sm:px-6">
                                    <div className="flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-20 rounded-md" />
                                    </div>
                                    <div className="ml-6 flex-1 flex flex-col">
                                        <div className="flex">
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-sm font-medium text-gray-700">{item.title}</h4>
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-2 flex items-end justify-between">
                                            <p className="mt-1 text-sm font-medium text-gray-900">{item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <dl className="border-t border-gray-200 py-6 px-4 sm:px-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">{subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Shipping</dt>
                                <dd className="text-sm font-medium text-gray-900">{shippingCost.toFixed(2)}</dd>
                            </div>

                            {discount && (
                                <div className="flex items-center justify-between text-green-600">
                                    <dt className="text-sm">Discount ({discount.code})</dt>
                                    <dd className="text-sm font-medium">-{discount.amount.toFixed(2)}</dd>
                                </div>
                            )}

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Discount code"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="bg-gray-200 p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && <p className="mt-1 text-sm text-red-600">{couponError}</p>}
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt className="text-base font-medium text-gray-900">Total</dt>
                                <dd className="text-base font-medium text-gray-900">{total.toFixed(2)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="mt-10 lg:mt-0 lg:col-start-1">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {checkoutConfig.fields.email.visible && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        required={checkoutConfig.fields.email.required}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            )}

                            {checkoutConfig.fields.phone.visible && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        required={checkoutConfig.fields.phone.required}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            )}

                            {checkoutConfig.fields.address.visible && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <textarea
                                        required={checkoutConfig.fields.address.required}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        rows={3}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            )}

                            <h2 className="text-lg font-medium text-gray-900 pt-6">Shipping Method</h2>
                            <div className="space-y-4">
                                {shippingOptions.map((option) => (
                                    <div key={option.id} className="flex items-center">
                                        <input
                                            id={option.id}
                                            name="shipping"
                                            type="radio"
                                            checked={shippingMethod?.id === option.id}
                                            onChange={() => setShippingMethod(option)}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                                            {option.label} ({option.fee} {store.currency})
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : `Place Order (${total.toFixed(2)})`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
