import { defineStore } from 'pinia';
import api from '@/services/api';

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({}),  // Rien à stocker ici
    getters: {
        userData() {
            return JSON.parse(sessionStorage.getItem('userData')) || {};
        }
    },
    actions: {
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },
        async fetchUserProfile() {
            const userId = this.userData.id;

            this.setAuthorizationHeader();
            try {
                const response = await api.get(`/api/users/${userId}`);
                // Mettez à jour les données de l'utilisateur dans sessionStorage avec les données les plus récentes
                sessionStorage.setItem('userData', JSON.stringify(response.data.data));
            } catch (error) {
                console.error("Error fetching user profile:", error.response.data);
            }
        },
        async updateUserProfile(updatedData) {
            const userId = this.userData.id;

            this.setAuthorizationHeader();
            try {
                const response = await api.put(`/api/users/${userId}`, updatedData);
                sessionStorage.setItem('userData', JSON.stringify(response.data.data));
                return response.data.message;
            } catch (error) {
                console.error("Error updating user profile:", error.response.data);
            }
        },
        async archiveUserProfile() {
            const userId = this.userData.id;

            this.setAuthorizationHeader();
            try {
                const response = await api.post(`/api/users/${userId}/archive`);
                sessionStorage.removeItem('userData');
                return response.data.message;
            } catch (error) {
                console.error("Error archiving user:", error.response.data);
            }
        }
    }
});
