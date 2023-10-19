import { defineStore } from 'pinia';
import api from '@/services/api';

export const useActiviteStore = defineStore('activites', {
    state: () => ({
        activites: [],
        archivedActivites: []
    }),

    actions: {
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        async fetchActivites() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/activites');
                this.activites = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des activités:", error.response.data);
            }
        },

        async addActivite(activite) {
            this.setAuthorizationHeader();
            try {
                await api.post('/api/activites', activite);
                await this.fetchActivites();
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'activité:", error.response.data);
            }
        },

        async updateActivite(id, updatedActivite) {
            this.setAuthorizationHeader();
            try {
                await api.put(`/api/activites/${id}`, updatedActivite);
                await this.fetchActivites();
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'activité:", error.response.data);
            }
        },

        async archiveActivite(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/activites/${id}/archive`);
                await this.fetchActivites();
            } catch (error) {
                console.error("Erreur lors de l'archivage de l'activité:", error.response.data);
            }
        },

        async fetchArchivedActivites() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/activites-archived');
                this.archivedActivites = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des activités archivées:", error.response.data);
            }
        },

        async restoreArchivedActivite(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/activites/${id}/restore`);
                await this.fetchActivites();
                await this.fetchArchivedActivites();
            } catch (error) {
                console.error("Erreur lors de la restauration de l'activité archivée:", error.response.data);
            }
        }
    }
});
