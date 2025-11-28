import { create } from 'zustand';
import api from '../api/axios';

const useSubscriptionStore = create((set) => ({
    loading: false,
    error: null,

    createCheckoutSession: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/subscriptions/create-checkout-session');
            window.location.href = response.data.url;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to start checkout',
                loading: false,
            });
        }
    },

    createPortalSession: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/subscriptions/create-portal-session');
            window.location.href = response.data.url;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to open portal',
                loading: false,
            });
        }
    },
}));

export default useSubscriptionStore;
