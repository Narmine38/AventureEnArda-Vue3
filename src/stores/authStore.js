import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    id: 'auth',
    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('auth_token'),
        isAdmin: sessionStorage.getItem('isAdmin') === 'true', // Récupérer isAdmin du sessionStorage
        userRole: JSON.parse(sessionStorage.getItem('userRole')) || [] // Récupérer le rôle du sessionStorage
    }),
    getters: {
    },
    actions: {
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            const role = this.userRole;

            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }

            if (role.includes('admin')) {
                api.defaults.headers.common['Role'] = 'admin';
            }
        },

        async login(credentials) {
            try {
                // Récupération du cookie CSRF
                await api.get('/sanctum/csrf-cookie');

                // Tentative de connexion
                const response = await api.post('/api/login', credentials);

                if (response.data.message === 'Logged in successfully.') {
                    this.isLoggedIn = true;

                    // Stocker le token, les données de l'utilisateur et le rôle dans sessionStorage
                    sessionStorage.setItem('auth_token', response.data.token);
                    sessionStorage.setItem('userData', JSON.stringify(response.data.user));
                    sessionStorage.setItem('userRole', JSON.stringify(response.data.roles)); // Stocker le rôle ici

                    // Mettre à jour le rôle dans le state
                    this.userRole = response.data.roles;

                    // Vérifiez si l'utilisateur a le rôle 'admin'
                    if (this.userRole.includes('admin')) {
                        this.isAdmin = true;
                        sessionStorage.setItem('isAdmin', 'true'); // Stocker en tant que chaîne
                    } else {
                        this.isAdmin = false;
                        sessionStorage.setItem('isAdmin', 'false');
                    }
                }
            } catch (error) {
                console.error("Error logging in:", error.response.data);
                this.isLoggedIn = false;
                this.isAdmin = false;
                sessionStorage.removeItem('auth_token');
                sessionStorage.removeItem('userData');
                sessionStorage.removeItem('isAdmin'); // Supprimer isAdmin
                sessionStorage.removeItem('userRole'); // Supprimer le rôle
            }
        },

        async logout() {
            this.setAuthorizationHeader(); // Utiliser le header d'authentification ici

            try {
                const response = await api.post('/api/logout');

                delete api.defaults.headers.common['Authorization'];

                if (response.data.message === 'Logged out successfully.') {
                    this.isLoggedIn = false;
                    this.isAdmin = false;
                    this.userRole = [];
                    sessionStorage.removeItem('auth_token');
                    sessionStorage.removeItem('userData');
                    sessionStorage.removeItem('isAdmin'); // Supprimer isAdmin
                    sessionStorage.removeItem('userRole'); // Supprimer le rôle
                } else {
                    console.warn("Unexpected response during logout:", response.data.message);
                }
            } catch (error) {
                console.error("Error logging out:", error.response.data);
            }
        }
    }
});
