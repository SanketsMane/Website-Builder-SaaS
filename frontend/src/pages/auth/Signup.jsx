import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Mail, Lock, User, Smartphone, MessageSquare, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import { Glow } from '../../components/ui/glow';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
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
    const { register, sendOtp, verifyOtp, isLoading, error, user } = useAuthStore();

    // Redirect if user is already authenticated
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

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
        }
        
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otpSent) {
            // First step: register and send OTP
            await register(formData.name, formData.email, formData.password, `+91${formData.mobile}`);
            if (!useAuthStore.getState().error) {
                const success = await sendOtp(`+91${formData.mobile}`);
                if (success) {
                    setOtpSent(true);
                }
            }
        } else {
            // Second step: verify OTP
            const success = await verifyOtp(`+91${formData.mobile}`, otp);
            if (success) {
                navigate('/dashboard');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Glow color="indigo" className="absolute -top-20 -right-20 animate-appear-zoom opacity-0 [animation-delay:1000ms]" />
                <Glow color="cyan" className="absolute -bottom-20 -left-20 animate-appear-zoom opacity-0 [animation-delay:1200ms]" />
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
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 animate-appear opacity-0 [animation-delay:300ms]">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                        Sign in here
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

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!otpSent ? (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

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
                                                value={formData.mobile || ''}
                                                onChange={handleChange}
                                                maxLength="10"
                                                pattern="[0-9]{10}"
                                                placeholder="9876543210"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
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
                                            autoComplete="new-password"
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

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 hover:from-indigo-700 hover:to-indigo-800 dark:hover:from-indigo-600 dark:hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                                Creating account...
                                            </div>
                                        ) : (
                                            'Send Verification Code'
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-center mb-6 animate-appear">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Verify your mobile number
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We sent a verification code to +91{formData.mobile}
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        Verification Code
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
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength="6"
                                            placeholder="Enter 6-digit code"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 hover:from-indigo-700 hover:to-indigo-800 dark:hover:from-indigo-600 dark:hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                                Verifying...
                                            </div>
                                        ) : (
                                            'Verify & Create Account'
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white/90 dark:bg-gray-800/90 text-gray-500 dark:text-gray-400">New to Sellpoint.io?</span>
                            </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                            <Link 
                                to="/login" 
                                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                            >
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;