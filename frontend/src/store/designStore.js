import { create } from 'zustand';
import api from '../api/axios';

const useDesignStore = create((set, get) => ({
    homepageConfig: null,
    checkoutConfig: null,
    orderSummaryConfig: null,
    customPages: [],
    loading: false,
    error: null,

    // Fetch all configs for a store
    fetchDesignConfigs: async (storeId) => {
        set({ loading: true, error: null });
        try {
            const [homeRes, checkoutRes, summaryRes, pagesRes] = await Promise.all([
                api.get(`/stores/${storeId}/design/homepage`),
                api.get(`/stores/${storeId}/design/checkout`),
                api.get(`/stores/${storeId}/design/order-summary`),
                api.get(`/stores/${storeId}/design/pages`),
            ]);

            set({
                homepageConfig: homeRes.data,
                checkoutConfig: checkoutRes.data,
                orderSummaryConfig: summaryRes.data,
                customPages: pagesRes.data,
                loading: false,
            });
        } catch (error) {
            set({ error: 'Failed to fetch design configs', loading: false });
        }
    },

    updateHomepageConfig: async (storeId, config) => {
        try {
            const res = await api.put(`/stores/${storeId}/design/homepage`, config);
            set({ homepageConfig: res.data });
        } catch (error) {
            console.error('Failed to update homepage config');
        }
    },

    updateCheckoutConfig: async (storeId, config) => {
        try {
            const res = await api.put(`/stores/${storeId}/design/checkout`, config);
            set({ checkoutConfig: res.data });
        } catch (error) {
            console.error('Failed to update checkout config');
        }
    },

    updateOrderSummaryConfig: async (storeId, config) => {
        try {
            const res = await api.put(`/stores/${storeId}/design/order-summary`, config);
            set({ orderSummaryConfig: res.data });
        } catch (error) {
            console.error('Failed to update order summary config');
        }
    },

    // Local updates for immediate preview
    setHomepageConfig: (config) => set({ homepageConfig: config }),
    setCheckoutConfig: (config) => set({ checkoutConfig: config }),
    setOrderSummaryConfig: (config) => set({ orderSummaryConfig: config }),
}));

export default useDesignStore;
