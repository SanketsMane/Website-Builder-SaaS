import { create } from 'zustand';
import api, { setAuthToken } from '../api/axios';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            // Fallback if user object not present, construct from response data
            const userData = user || {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                plan: response.data.plan,
                verified: response.data.verified
            };
            
            // Set the auth token for future requests
            if (token) {
                setAuthToken(token);
                // Store the access token in sessionStorage for persistence
                sessionStorage.setItem('accessToken', token);
            }
            
            // Store auth state in sessionStorage
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(userData));
            
            set({ user: userData, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Login failed',
                isLoading: false,
            });
            throw error;
        }
    },

    register: async (name, email, password, mobile) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/register', { name, email, password, mobile });
            const { token, user } = response.data;
            
            // Set the auth token for future requests
            if (token) {
                setAuthToken(token);
            }
            
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false,
            });
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await api.post('/auth/logout');
            // Clear all auth data
            setAuthToken(null);
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            // Clear all auth data even if logout fails
            setAuthToken(null);
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: error.response?.data?.message || 'Logout failed'
            });
        }
    },

    sendOtp: async (mobile, type) => {
        set({ isLoading: true, error: null });
        try {
            await api.post('/auth/send-otp', { mobile, type });
            set({ isLoading: false });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to send OTP',
                isLoading: false,
            });
            return false;
        }
    },

    verifyOtp: async (mobile, otp) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/verify-otp', { mobile, otp });
            const { token, user } = response.data;
            
            // Set the auth token for future requests
            if (token) {
                setAuthToken(token);
            }
            
            // Store auth state in sessionStorage
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(user));
            
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Invalid OTP',
                isLoading: false,
            });
            return false;
        }
    },

    checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
            // Try to get user info first (this will trigger token refresh if needed)
            const response = await api.get('/auth/me');
            const user = response.data.user;
            
            // Store auth state in sessionStorage for persistence
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(user));
            
            set({ 
                user, 
                isAuthenticated: true, 
                isLoading: false 
            });
        } catch (error) {
            // Clear all auth data on failure
            setAuthToken(null);
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            
            set({ 
                user: null, 
                isAuthenticated: false, 
                isLoading: false,
                error: null 
            });
        }
    },

    // Initialize auth state from session storage
    initializeAuth: async () => {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
        const userStr = sessionStorage.getItem('user');
        const accessToken = sessionStorage.getItem('accessToken');
        
        if (isAuthenticated && userStr && accessToken) {
            try {
                const user = JSON.parse(userStr);
                
                // Restore the access token to axios
                setAuthToken(accessToken);
                
                set({ 
                    user, 
                    isAuthenticated: true, 
                    isLoading: false 
                });
                
                // Verify the token is still valid with a quick check
                try {
                    await api.get('/auth/me');
                    return true;
                } catch (verifyError) {
                    console.log('Stored token is invalid, clearing session');
                    // Token is invalid, clear everything
                    setAuthToken(null);
                    sessionStorage.removeItem('isAuthenticated');
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('accessToken');
                    set({ user: null, isAuthenticated: false, isLoading: false });
                    return false;
                }
            } catch (e) {
                // If parsing fails, clear storage
                sessionStorage.removeItem('isAuthenticated');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('accessToken');
                setAuthToken(null);
            }
        }
        
        set({ isLoading: false });
        return false;
    },

    clearError: () => {
        set({ error: null });
    },
}));

export default useAuthStore;
