import { create } from 'zustand';
import api from '../api/axios';

const useStoreStore = create((set, get) => ({
    stores: [],
    currentStore: null,
    templates: [],
    loading: false,
    error: null,

    fetchStores: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/stores');
            set({ stores: response.data, loading: false });
            // Set first store as current if none selected
            if (response.data.length > 0 && !get().currentStore) {
                set({ currentStore: response.data[0] });
            }
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch stores',
                loading: false,
            });
        }
    },

    fetchTemplates: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/stores/templates');
            set({ templates: response.data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch templates', loading: false });
        }
    },

    createStore: async (storeData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/stores', storeData);
            set((state) => ({
                stores: [...state.stores, response.data],
                currentStore: response.data,
                loading: false,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to create store',
                loading: false,
            });
            throw error;
        }
    },

    setCurrentStore: (store) => {
        set({ currentStore: store });
    },
}));

export default useStoreStore;
