import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    id: 'auth',
    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('isLoggedIn'), // Convertir en booléen
    }),
    actions: {
        async login(credentials) {
            try {
                await api.get('/sanctum/csrf-cookie');
                const response = await api.post('/api/login', credentials);
                if (response.data.message === 'Logged in successfully.') {
                    this.isLoggedIn = true;
                    sessionStorage.setItem('isLoggedIn', 'true');
                }
            } catch (error) {
                console.error("Error logging in:", error.response.data);
                this.isLoggedIn = false;
                sessionStorage.removeItem('isLoggedIn');
            }
        },
        async logout() {
            try {
                await api.post('/api/logout');
                this.isLoggedIn = false;
                sessionStorage.removeItem('isLoggedIn');
            } catch (error) {
                console.error("Error logging out:", error.response.data);
            }
        }
    }
});
