import { create } from 'zustand';
import api from '../api/axios';

const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async (storeId) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/stores/${storeId}/products`);
            set({ products: response.data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch products', loading: false });
        }
    },

    connectSheet: async (storeId) => {
        set({ loading: true });
        try {
            const response = await api.post(`/stores/${storeId}/sheets/connect`, { code: 'mock-code' });
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ error: 'Failed to connect sheet', loading: false });
            throw error;
        }
    },

    syncProducts: async (storeId) => {
        set({ loading: true });
        try {
            const response = await api.post(`/stores/${storeId}/sheets/sync`);
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ error: 'Failed to sync products', loading: false });
            throw error;
        }
    },

    disconnectSheet: async (storeId) => {
        set({ loading: true });
        try {
            await api.delete(`/stores/${storeId}/sheets/disconnect`);
            set({ loading: false });
        } catch (error) {
            set({ error: 'Failed to disconnect sheet', loading: false });
        }
    },
}));

export default useProductStore;
