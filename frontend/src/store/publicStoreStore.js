import { create } from 'zustand';
import api from '../api/axios';

const usePublicStoreStore = create((set) => ({
    store: null,
    products: [],
    currentProduct: null,
    loading: false,
    error: null,

    fetchStoreBySubdomain: async (subdomain) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/public/${subdomain}`);
            set({ store: response.data, loading: false });
            return response.data;
        } catch (error) {
            set({
                store: null,
                error: error.response?.data?.message || 'Store not found',
                loading: false,
            });
        }
    },

    fetchStoreProducts: async (subdomain) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/public/${subdomain}/products`);
            set({ products: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch products',
                loading: false,
            });
        }
    },

    fetchStoreProduct: async (subdomain, productId) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/public/${subdomain}/products/${productId}`);
            set({ currentProduct: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch product',
                loading: false,
            });
        }
    },
}));

export default usePublicStoreStore;
