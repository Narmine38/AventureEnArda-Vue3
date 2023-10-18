import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    id: 'auth',
    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('auth_token'),
        isAdmin: false  // Nouvelle propriété pour vérifier si l'utilisateur est un admin
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
                    sessionStorage.setItem('auth_token', response.data.token);

                    // Vérifiez si l'utilisateur a le rôle 'admin'
                    if (response.data.roles && response.data.roles.includes('admin')) {
                        this.isAdmin = true;  // Mettez à jour la propriété isAdmin
                    }
                }
            } catch (error) {
                console.error("Error logging in:", error.response.data);
                this.isLoggedIn = false;
                this.isAdmin = false;  // Réinitialisez la propriété isAdmin en cas d'erreur
                sessionStorage.removeItem('auth_token');
            }
        },

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
                    this.isAdmin = false;  // Réinitialisez la propriété isAdmin lors de la déconnexion
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

        // ... vous pouvez ajouter d'autres actions si nécessaire
    }
});
