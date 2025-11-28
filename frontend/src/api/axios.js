import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let accessToken = null;

// Function to set the auth token
export const setAuthToken = (token) => {
    accessToken = token;
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    
    failedQueue = [];
};

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if error exists and has response before accessing status
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue the request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    if (token) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await api.post('/auth/refresh');
                const { token } = response.data;
                
                // Update the authorization header globally and for the original request
                if (token) {
                    setAuthToken(token);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                
                // Process queued requests
                processQueue(null, token);
                
                // Reset refreshing state
                isRefreshing = false;
                
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, process queue with error
                processQueue(refreshError, null);
                isRefreshing = false;
                
                // Clear all auth data
                setAuthToken(null);
                sessionStorage.removeItem('isAuthenticated');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('accessToken');
                
                // Only redirect if we're not already on auth pages
                if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                    console.log('Refresh token expired, redirecting to login');
                    window.location.href = '/login';
                }
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
