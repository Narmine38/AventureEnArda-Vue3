import { defineStore } from 'pinia';
import api from '@/services/api';

export const useHebergementStore = defineStore('hebergements', {
    // Définition de l'état initial du store.
    // Ce store contiendra à la fois les hébergements actifs et les hébergements archivés.
    state: () => ({
        hebergements: [],
        archivedHebergements: []
    }),

    actions: {
        // Cette fonction met à jour l'en-tête d'autorisation des requêtes API.
        // Elle utilise le token stocké dans sessionStorage pour s'authentifier auprès de l'API.
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        // Récupère tous les hébergements actifs depuis l'API et les stocke dans l'état du store.
        async fetchHebergements() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/hebergements');
                this.hebergements = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des hébergements:", error.response.data);
            }
        },

        // Ajoute un nouvel hébergement dans la base de données via l'API.
        // Après l'ajout réussi, il actualise la liste des hébergements.
        async addHebergement(hebergement) {
            this.setAuthorizationHeader();
            try {
                await api.post('/api/hebergements', hebergement);
                await this.fetchHebergements();
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'hébergement:", error.response.data);
            }
        },

        // Met à jour les informations d'un hébergement spécifique dans la base de données via l'API.
        // Après la mise à jour réussie, il actualise la liste des hébergements.
        async updateHebergement(id, updatedHebergement) {
            this.setAuthorizationHeader();
            try {
                await api.put(`/api/hebergements/${id}`, updatedHebergement);
                await this.fetchHebergements();
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'hébergement:", error.response.data);
            }
        },

        // Archive un hébergement spécifique en le marquant comme "soft deleted" dans la base de données via l'API.
        // Après l'archivage réussi, il actualise la liste des hébergements.
        async archiveHebergement(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/hebergements/${id}/archive`);
                await this.fetchHebergements();
            } catch (error) {
                console.error("Erreur lors de l'archivage de l'hébergement:", error.response.data);
            }
        },

        // Récupère tous les hébergements qui sont "soft deleted" (archivés) depuis l'API
        // et les stocke dans l'état du store.
        async fetchArchivedHebergements() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/hebergements-archived');
                this.archivedHebergements = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des hébergements archivés:", error.response.data);
            }
        },

        // Restaure un hébergement archivé (le "désarchive") dans la base de données via l'API.
        // Après la restauration réussie, il actualise la liste des hébergements et des hébergements archivés.
        async restoreArchivedHebergement(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/hebergements/${id}/restore`);
                await this.fetchHebergements();
                await this.fetchArchivedHebergements();
            } catch (error) {
                console.error("Erreur lors de la restauration de l'hébergement archivé:", error.response.data);
            }
        }
    }
});
