import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAdminStore = defineStore({
    id: 'admin',

    state: () => ({
        users: [],
    }),

    getters: {},

    actions: {
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');

            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }

        },

        async fetchUsers() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/users');
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error.response.data);
            }
        },

        // ... autres actions ...
    }
});

export default useAdminStore;
