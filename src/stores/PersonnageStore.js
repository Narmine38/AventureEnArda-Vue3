import { defineStore } from 'pinia';
import api from '@/services/api';

export const usePersonnageStore = defineStore('personnages', {
    state: () => ({
        personnages: [],
        archivedPersonnages: []
    }),

    actions: {
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        async fetchPersonnages() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/personnages');
                this.personnages = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des personnages:", error.response.data);
            }
        },

        async addPersonnage(personnage) {
            this.setAuthorizationHeader();
            try {
                await api.post('/api/personnages', personnage);
                await this.fetchPersonnages();
            } catch (error) {
                console.error("Erreur lors de l'ajout du personnage:", error.response.data);
            }
        },

        async updatePersonnage(id, updatedPersonnage) {
            this.setAuthorizationHeader();
            try {
                await api.put(`/api/personnages/${id}`, updatedPersonnage);
                await this.fetchPersonnages();
            } catch (error) {
                console.error("Erreur lors de la mise à jour du personnage:", error.response.data);
            }
        },

        async archivePersonnage(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/personnages/${id}/archive`);
                await this.fetchPersonnages();
            } catch (error) {
                console.error("Erreur lors de l'archivage du personnage:", error.response.data);
            }
        },

        async fetchArchivedPersonnages() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/personnages-archived');
                this.archivedPersonnages = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des personnages archivés:", error.response.data);
            }
        },

        async restoreArchivedPersonnage(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/personnages/${id}/restore`);
                await this.fetchPersonnages();
                await this.fetchArchivedPersonnages();
            } catch (error) {
                console.error("Erreur lors de la restauration du personnage archivé:", error.response.data);
            }
        }
    }
});
