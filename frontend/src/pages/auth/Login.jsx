import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Mail, Lock, Smartphone, MessageSquare, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import { Glow } from '../../components/ui/glow';

const Login = () => {
    const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        mobile: '',
        otp: '',
    });
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true' || 
                   (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const navigate = useNavigate();
    const { login, sendOtp, verifyOtp, isLoading, error, isAuthenticated, initializeAuth } = useAuthStore();

    // Check if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        let value = e.target.value;
        
        // Format Indian mobile number
        if (e.target.name === 'mobile') {
            // Remove all non-digits
            value = value.replace(/\D/g, '');
            
            // Limit to 10 digits (Indian mobile numbers)
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            // Add +91 prefix for display if not present
            if (value.length > 0) {
                formData.mobile = value;
            }
        }
        
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSendOtp = async () => {
        if (!formData.mobile) return;
        const success = await sendOtp(formData.mobile, 'login');
        if (success) {
            setOtpSent(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginMethod === 'email') {
            await login(formData.email, formData.password);
            if (useAuthStore.getState().isAuthenticated) {
                navigate('/dashboard');
            }
        } else {
            // Mobile Login
            if (!otpSent) {
                await handleSendOtp();
            } else {
                const success = await verifyOtp(formData.mobile, formData.otp);
                if (success) {
                    navigate('/dashboard');
                }
            }
        }
    };

    return (
        <div className="min-h-screen gradient-bg dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-200 to-cyan-200 dark:from-indigo-900/30 dark:to-cyan-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
                <Glow
                    variant="above"
                    className="animate-appear-zoom opacity-0 [animation-delay:500ms]"
                />
            </div>

            {/* Dark Mode Toggle */}
            <div className="absolute top-4 right-4 z-50">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg"
                    title="Toggle theme"
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md animate-appear">
                <Link to="/" className="flex justify-center group">
                    <span className="text-3xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">Sellpoint.io</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white animate-appear opacity-0 [animation-delay:150ms]">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 animate-appear opacity-0 [animation-delay:300ms]">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-appear opacity-0 [animation-delay:450ms]">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg py-8 px-4 sm:px-10 shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/50 transition-all duration-300">
                    {error && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex rounded-xl bg-gray-100 dark:bg-gray-700 p-1 mb-6">
                        <button
                            type="button"
                            className={`flex-1 py-3 px-4 text-center text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                                loginMethod === 'email' 
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-lg transform scale-[0.98]' 
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                            onClick={() => { setLoginMethod('email'); setOtpSent(false); }}
                        >
                            <Mail className="w-4 h-4" />
                            Email
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-3 px-4 text-center text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                                loginMethod === 'mobile' 
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-lg transform scale-[0.98]' 
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                            onClick={() => { setLoginMethod('mobile'); setOtpSent(false); }}
                        >
                            <Smartphone className="w-4 h-4" />
                            SMS
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {loginMethod === 'email' ? (
                            <>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        Mobile number
                                    </label>
                                    <div className="relative flex">
                                        <div className="flex items-center px-3 py-3 bg-gray-50 dark:bg-gray-600 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                                            🇮🇳 +91
                                        </div>
                                        <div className="relative flex-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Smartphone className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <input
                                                id="mobile"
                                                name="mobile"
                                                type="tel"
                                                required
                                                disabled={otpSent}
                                                value={formData.mobile || ''}
                                                onChange={handleChange}
                                                maxLength="10"
                                                pattern="[0-9]{10}"
                                                placeholder="9876543210"
                                                className={`block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 ${otpSent ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {otpSent && (
                                    <div className="animate-appear">
                                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                            Enter verification code
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MessageSquare className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <input
                                                id="otp"
                                                name="otp"
                                                type="text"
                                                required
                                                value={formData.otp}
                                                onChange={handleChange}
                                                placeholder="123456"
                                                maxLength="6"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-center tracking-widest text-lg font-mono"
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            We sent a verification code to +91 {formData.mobile}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    loginMethod === 'mobile' && !otpSent ? 'Send Verification Code' : 'Sign in to your account'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">New to Store.link?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link to="/signup" className="btn-outline w-full py-3 text-base">
                                Create your free account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
