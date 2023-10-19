import {defineStore} from 'pinia';
import api from '@/services/api';

export const useAdminStore = defineStore({
    // ID unique du store pour l'identifier lors de l'utilisation avec Pinia.
    id: 'admin',

    // Initialisation de l'état du store. Actuellement, il stocke une liste d'utilisateurs.
    state: () => ({
        users: [],
    }),

    actions: {
        // Cette action est utilisée pour définir le header d'autorisation pour toutes les requêtes API.
        // Elle récupère le token d'authentification depuis sessionStorage et le fixe dans les headers.
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        // Cette action est utilisée pour récupérer la liste de tous les utilisateurs depuis l'API.
        async fetchUsers() {
            // Avant de faire la requête, on définit le header d'autorisation.
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/users');
                this.users = response.data.data;
            } catch (error) {
                // En cas d'erreur lors de la requête, un message d'erreur est affiché dans la console.
                console.error("Error fetching users:", error.response.data);
            }
        },

        archiveUser(userId) {
            this.setAuthorizationHeader();

            return api.delete(`/api/users/${userId}`).then(response => response.data.message);
        }

    }
});
