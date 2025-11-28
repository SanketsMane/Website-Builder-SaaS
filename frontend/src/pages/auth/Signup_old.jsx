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
    const { register, sendOtp, verifyOtp, isLoading, error } = useAuthStore();

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
            
            // Format with spaces for better readability
            if (value.length >= 6) {
                value = value.slice(0, 5) + ' ' + value.slice(5);
            }
        }
        
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otpSent) {
            // First step: register and send OTP
            await register(formData.name, formData.email, formData.password, `+91${formData.mobile.replace(/\s/g, '')}`);
            if (!useAuthStore.getState().error) {
                const success = await sendOtp(`+91${formData.mobile.replace(/\s/g, '')}`);
                if (success) {
                    setOtpSent(true);
                }
            }
        } else {
            // Second step: verify OTP
            const success = await verifyOtp(`+91${formData.mobile.replace(/\s/g, '')}`, otp);
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
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!showOtpModal ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Mobile Number (India)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Smartphone className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        required
                                        value={formData.mobile || '+91 '}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            if (!e.target.value || e.target.value.trim() === '') {
                                                setFormData({ ...formData, mobile: '+91 ' });
                                            }
                                        }}
                                        placeholder="+91 9876543210"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                                        className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-500 dark:to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                            Creating account...
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="space-y-6" onSubmit={handleVerifyOtp}>
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verify Mobile Number</h3>
                                <p className="text-gray-600 dark:text-gray-400">We sent an OTP to {formData.mobile}</p>
                            </div>

                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Enter OTP
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MessageSquare className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-500 dark:to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                            Verifying...
                                        </div>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 backdrop-blur-sm">Or</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link 
                                to="/login" 
                                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                            >
                                Already have an account? Sign in here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
