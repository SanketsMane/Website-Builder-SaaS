import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from './store/authStore';
import usePublicStoreStore from './store/publicStoreStore';
import { PageLoader } from './components/LoadingStates';

// Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardLayout from './components/layout/DashboardLayout';
import CreateStoreWizard from './pages/dashboard/CreateStoreWizard';
import ProductManager from './pages/dashboard/products/ProductManager';
import Subscription from './pages/dashboard/Subscription';
import DesignLayout from './pages/dashboard/design/DesignLayout';
import OrderList from './pages/dashboard/orders/OrderList';
import OrderDetail from './pages/dashboard/orders/OrderDetail';
import CouponList from './pages/dashboard/coupons/CouponList';
import AnalyticsDashboard from './pages/dashboard/analytics/AnalyticsDashboard';
import SettingsLayout from './pages/dashboard/settings/SettingsLayout';
import GeneralSettings from './pages/dashboard/settings/GeneralSettings';
import PaymentSettings from './pages/dashboard/settings/PaymentSettings';

// Marketing Pages
import LandingPage from './pages/marketing/LandingPage';
import PricingPage from './pages/marketing/PricingPage';
import AboutPage from './pages/marketing/AboutPage';

// Public Store Pages
import PublicStoreLayout from './components/layout/PublicStoreLayout';
import StoreHome from './pages/public/StoreHome';
import ProductDetail from './pages/public/ProductDetail';
import Checkout from './pages/public/Checkout';
import OrderSuccess from './pages/public/OrderSuccess';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuth, initializeAuth, isLoading, user } = useAuthStore();
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                // First try to restore from session storage
                const hasSessionAuth = await initializeAuth();
                
                // If no valid session, try to check auth with server
                if (!hasSessionAuth) {
                    await checkAuth();
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setInitialized(true);
            }
        };
        
        initialize();
    }, [checkAuth, initializeAuth]);

    // Show loading until initialization is complete
    if (!initialized || isLoading) {
        return <PageLoader text="Authenticating..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const StoreGuard = ({ children }) => {
    const { store, fetchStoreBySubdomain, loading } = usePublicStoreStore();
    const [subdomain, setSubdomain] = useState('');

    useEffect(() => {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        let sub = '';

        if (hostname.includes('localhost')) {
            // Localhost logic: store.localhost -> sub = store
            if (parts.length > 1) sub = parts[0];
        } else {
            // Production logic: store.domain.com -> sub = store
            if (parts.length > 2) sub = parts[0];
        }

        setSubdomain(sub);
        if (sub && sub !== 'www') {
            fetchStoreBySubdomain(sub);
        }
    }, [fetchStoreBySubdomain]);

    if (loading) return <PageLoader text="Loading store..." />;
    if (!store && subdomain && subdomain !== 'www') {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Store Not Found</h1>
                    <p className="text-lg text-gray-600 mb-8">The store you're looking for doesn't exist or has been moved.</p>
                    <a href="/" className="btn-primary">Go to Homepage</a>
                </div>
            </div>
        );
    }

    return children;
};

function App() {
    const { initializeAuth } = useAuthStore();
    const [isSubdomain, setIsSubdomain] = useState(false);

    useEffect(() => {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        // Simple check: if localhost and parts > 1 (e.g. test.localhost)
        // or production and parts > 2 (e.g. test.domain.com)
        if (hostname.includes('localhost')) {
            setIsSubdomain(parts.length > 1 && parts[0] !== 'www');
        } else {
            setIsSubdomain(parts.length > 2 && parts[0] !== 'www');
        }
    }, []);

    // Initialize auth state from session storage on app load
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    if (isSubdomain) {
        return (
            <StoreGuard>
                <Routes>
                    <Route path="/" element={<PublicStoreLayout />}>
                        <Route index element={<StoreHome />} />
                        <Route path="product/:id" element={<ProductDetail />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="order-success" element={<OrderSuccess />} />
                    </Route>
                </Routes>
            </StoreGuard>
        );
    }

    return (
        <Routes>
            {/* Marketing Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            }>
                <Route index element={<div className="text-center mt-10"><h2>Welcome to your Dashboard</h2></div>} />
                <Route path="products" element={<ProductManager />} />
                <Route path="subscription" element={<Subscription />} />

                {/* Design Routes */}
                <Route path="design/*" element={<DesignLayout />} />

                {/* Order Routes */}
                <Route path="orders" element={<OrderList />} />
                <Route path="orders/:id" element={<OrderDetail />} />

                {/* Marketing & Analytics */}
                <Route path="coupons" element={<CouponList />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />

                {/* Settings */}
                <Route path="settings" element={<SettingsLayout />}>
                    <Route path="general" element={<GeneralSettings />} />
                    <Route path="payments" element={<PaymentSettings />} />
                    <Route index element={<Navigate to="general" replace />} />
                </Route>
            </Route>

            <Route path="/create-store" element={
                <ProtectedRoute>
                    <CreateStoreWizard />
                </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;
