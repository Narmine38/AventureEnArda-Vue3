import api from "@/services/api";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    id: 'auth',

    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('isLoggedIn'),
        isAdmin: sessionStorage.getItem('isAdmin') === 'true',
        userRole: JSON.parse(sessionStorage.getItem('userRole')) || []
    }),

    actions: {
        async login(credentials) {
            try {
                // Avant de se connecter, nous obtenons un cookie CSRF pour améliorer la sécurité de la requête.
                await api.get('/sanctum/csrf-cookie');

                // Envoi des identifiants (par ex. email et mot de passe) au serveur pour tentative de connexion.
                const response = await api.post('/api/login', credentials);

                // Si la connexion est réussie, on stocke les données pertinentes.
                if (response.data.message === 'Logged in successfully.') {
                    this.setAuthData(response.data.user, response.data.roles);
                }
            } catch (error) {
                console.error("Error logging in:", error.response.data);
                // En cas d'erreur (par ex. mauvais identifiants), on efface les données d'authentification.
                this.clearAuthData();
            }
        },

        async logout() {
            try {
                // Envoi d'une requête de déconnexion au serveur.
                const response = await api.post('/api/logout');

                // Si la réponse du serveur indique une déconnexion réussie, on efface les données d'authentification.
                if (response.data.message === 'Logged out successfully.') {
                    this.clearAuthData();
                } else {
                    console.warn("Unexpected response during logout:", response.data.message);
                }
            } catch (error) {
                console.error("Error logging out:", error.response.data);
            }
        },

        setAuthData(user, roles) {
            this.isLoggedIn = true;
            this.userRole = roles;
            this.isAdmin = roles.includes('admin');

            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userData', JSON.stringify(user));
            sessionStorage.setItem('userRole', JSON.stringify(roles));
            sessionStorage.setItem('isAdmin', this.isAdmin ? 'true' : 'false');
        },

        clearAuthData() {
            this.isLoggedIn = false;
            this.isAdmin = false;
            this.userRole = [];

            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userData');
            sessionStorage.removeItem('isAdmin');
            sessionStorage.removeItem('userRole');
        }
    }
});
