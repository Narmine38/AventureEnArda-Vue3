import api from "@/services/api";
import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
    id: 'auth',

    // Initialisation de l'état du store à partir des valeurs stockées dans le sessionStorage.
    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('auth_token'),  // Vérifie si un token est présent dans le sessionStorage.
        isAdmin: sessionStorage.getItem('isAdmin') === 'true',  // Convertit la valeur string 'true'/'false' en booléen.
        userRole: JSON.parse(sessionStorage.getItem('userRole')) || []  // Récupère les rôles de l'utilisateur ou initialise à un tableau vide.
    }),

    actions: {
        // Cette méthode sert à configurer l'en-tête d'autorisation pour les requêtes API basées sur le token stocké.
        setAuthorizationHeader() {
            const token = this.isLoggedIn ? sessionStorage.getItem('auth_token') : null;
            const role = this.userRole;

            // Si un token est disponible, on l'ajoute à l'en-tête pour l'autorisation.
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }

            // Si l'utilisateur possède le rôle 'admin', un en-tête 'Role' est également ajouté.
            if (role.includes('admin')) {
                api.defaults.headers.common['Role'] = 'admin';
            }
        },

        async login(credentials) {
            try {
                // Avant de se connecter, nous obtenons un cookie CSRF pour améliorer la sécurité de la requête.
                await api.get('/sanctum/csrf-cookie');

                // Envoi des identifiants (par ex. email et mot de passe) au serveur pour tentative de connexion.
                const response = await api.post('/api/login', credentials);

                // Si la connexion est réussie, on stocke les données pertinentes.
                if (response.data.message === 'Logged in successfully.') {
                    this.setAuthData(response.data.token, response.data.user, response.data.roles);
                }
            } catch (error) {
                console.error("Error logging in:", error.response.data);
                // En cas d'erreur (par ex. mauvais identifiants), on efface les données d'authentification.
                this.clearAuthData();
            }
        },

        async logout() {
            // On configure l'en-tête d'autorisation pour la requête de déconnexion.
            this.setAuthorizationHeader();

            try {
                // Envoi d'une requête de déconnexion au serveur.
                const response = await api.post('/api/logout');

                // Après la déconnexion, on retire l'en-tête d'autorisation.
                delete api.defaults.headers.common['Authorization'];

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

        // Méthode pour stocker le token, les données de l'utilisateur et ses rôles après une connexion réussie.
        setAuthData(token, user, roles) {
            this.isLoggedIn = true;  // Indique que l'utilisateur est connecté.
            this.userRole = roles;   // Stocke les rôles de l'utilisateur.
            this.isAdmin = roles.includes('admin');  // Vérifie si l'utilisateur est administrateur.

            // Mise à jour du sessionStorage avec les données reçues.
            sessionStorage.setItem('auth_token', token);
            sessionStorage.setItem('userData', JSON.stringify(user));
            sessionStorage.setItem('userRole', JSON.stringify(roles));
            sessionStorage.setItem('isAdmin', this.isAdmin ? 'true' : 'false');
        },

        // Méthode pour effacer les données d'authentification après une déconnexion ou en cas d'erreur.
        clearAuthData() {
            this.isLoggedIn = false;  // Indique que l'utilisateur est déconnecté.
            this.isAdmin = false;     // Réinitialise le statut d'administrateur.
            this.userRole = [];       // Efface les rôles de l'utilisateur.

            // Effacement des données dans le sessionStorage.
            sessionStorage.removeItem('auth_token');
            sessionStorage.removeItem('userData');
            sessionStorage.removeItem('isAdmin');
            sessionStorage.removeItem('userRole');
        }
    }
});
