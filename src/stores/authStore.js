import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    id: 'auth',
    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('auth_token'), // Vérifie si le token existe pour déterminer l'état de connexion
    }),
    actions: {
        async login(credentials) {
            try {
                // Récupération du cookie CSRF
                await api.get('/sanctum/csrf-cookie');

                // Tentative de connexion
                const response = await api.post('/api/login', credentials);

                if (response.data.message === 'Logged in successfully.') {
                    this.isLoggedIn = true;
                    sessionStorage.setItem('auth_token', response.data.token); // Stockage du token dans sessionStorage
                }
            } catch (error) {
                console.error("Error logging in:", error.response.data);
                this.isLoggedIn = false;
                sessionStorage.removeItem('auth_token');
            }
        },

        // ... autres actions (comme logout, etc.)

        async logout() {
            // Configurer l'en-tête d'authentification avec le token stocké
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }

            try {
                const response = await api.post('/api/logout');

                // Supprimer l'en-tête d'authentification après la requête
                delete api.defaults.headers.common['Authorization'];

                if (response.data.message === 'Logged out successfully.') {
                    this.isLoggedIn = false;
                    sessionStorage.removeItem('auth_token'); // Suppression du token lors de la déconnexion
                    // Optionnel : rediriger vers la page d'accueil ou de connexion
                    // this.$router.push({ name: 'home' });
                } else {
                    console.warn("Unexpected response during logout:", response.data.message);
                }
            } catch (error) {
                console.error("Error logging out:", error.response.data);
                // Optionnel : afficher un message d'erreur à l'utilisateur
                // this.errorMessage = "An error occurred while logging out. Please try again.";
            }
        }


    }
});
