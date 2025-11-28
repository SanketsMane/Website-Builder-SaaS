import { Link } from 'react-router-dom';
import usePublicStoreStore from '../../store/publicStoreStore';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    const { store } = usePublicStoreStore();

    const config = store?.orderSummaryConfig || {
        title: 'Thank you for your order!',
        message: 'We have received your order and will contact you shortly.',
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="flex justify-center">
                    <CheckCircle className="h-24 w-24 text-green-500" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    {config.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    {config.message}
                </p>
                <div className="mt-5">
                    <Link
                        to="/"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
