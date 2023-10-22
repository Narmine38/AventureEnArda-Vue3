import { defineStore } from 'pinia';
import api from '@/services/api';

export const useUserProfileStore = defineStore('userProfile', {
    // Initialisation de l'état du store avec des valeurs par défaut ou des valeurs stockées dans le sessionStorage.
    state: () => ({
        // Récupère les données de l'utilisateur depuis le sessionStorage.
        userData: JSON.parse(sessionStorage.getItem('userData') || '{}'),
        users: [],  // Liste des utilisateurs.
        archivedUsers: [],  // Liste des utilisateurs archivés.
        selectedArchivedUser: null,  // Détails d'un utilisateur archivé sélectionné.
    }),

    actions: {
        // Configure l'en-tête d'autorisation pour toutes les requêtes API en fonction du token stocké dans le sessionStorage.
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        // Récupère la liste de tous les utilisateurs depuis l'API.
        async fetchUsers() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/users');
                this.users = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error.response.data);
            }
        },

        // Archive un utilisateur en utilisant son ID.
        async archiveUser(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/archive`);
                await this.fetchUsers();
            } catch (error) {
                console.error("Erreur lors de l'archivage de l'utilisateur:", error.response.data);
            }
        },

        // Récupère la liste des utilisateurs archivés depuis l'API.
        async fetchArchivedUsers() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/archived-users');
                this.archivedUsers = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs archivés:", error.response.data);
            }
        },

        // Récupère les détails d'un utilisateur archivé en utilisant son ID.
        async viewArchivedUser(id) {
            this.setAuthorizationHeader();
            try {
                const response = await api.get(`/api/archived-users/${id}`);
                this.selectedArchivedUser = response.data;
            } catch (error) {
                console.error("Erreur lors de la visualisation de l'utilisateur archivé:", error.response.data);
            }
        },

        // Restaure un utilisateur archivé en utilisant son ID.
        async restoreUser(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/restore`);
                await this.fetchUsers();
                await this.fetchArchivedUsers();
            } catch (error) {
                console.error("Erreur lors de la restauration de l'utilisateur:", error.response.data);
            }
        },

        // Met à jour le profil de l'utilisateur avec les données fournies.
        async updateUserProfile(updatedUserData) {
            this.setAuthorizationHeader();
            try {
                const response = await api.put(`/api/users/${updatedUserData.id}`, updatedUserData);

                // Met à jour l'état du store et le sessionStorage avec les nouvelles données de l'utilisateur.
                this.userData = response.data.data;
                sessionStorage.setItem('userData', JSON.stringify(this.userData));

                return response.data.message;
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'utilisateur:", error.response.data);
                throw error;
            }
        },
        async fetchUserReservations(userId) {
            this.setAuthorizationHeader();
            try {
                const response = await api.get(`/api/reservations/user/${userId}`);
                if (Array.isArray(response.data)) {
                    this.userReservations = response.data;
                    return response.data;
                } else {
                    console.warn("Format de données inattendu pour les réservations:", response.data);
                    return [];
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des réservations de l'utilisateur:", error);
                if (error.response) {
                    console.error("Détails de l'erreur:", error.response.data);
                }
                return [];
            }
        }


    }
});
