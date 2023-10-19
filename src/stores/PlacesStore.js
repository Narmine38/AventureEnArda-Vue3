import { defineStore } from 'pinia';
import api from '@/services/api';

export const usePlacesStore = defineStore('places', {
    state: () => ({
        places: [],
        archivedPlaces: []
    }),

    actions: {

        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        async fetchPlaces() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/lieux');
                this.places = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des lieux:", error.response.data);
            }
        },

        async addPlace(place) {
            this.setAuthorizationHeader();

            try {
                await api.post('/api/lieux', place);
                await this.fetchPlaces();
            } catch (error) {
                console.error("Erreur lors de l'ajout du lieu:", error.response.data);
            }
        },

        async updatePlace(id, updatedPlace) {
            this.setAuthorizationHeader();

            try {
                await api.put(`/api/lieux/${id}`, updatedPlace);
                await this.fetchPlaces();
            } catch (error) {
                console.error("Erreur lors de la mise à jour du lieu:", error.response.data);
            }
        },

        async archivePlace(id) {
            this.setAuthorizationHeader();

            try {
                // Utilisez la bonne route d'archivage
                await api.post(`/api/lieux/${id}/archive`);
                await this.fetchPlaces();
            } catch (error) {
                console.error("Erreur lors de l'archivage du lieu:", error.response.data);
            }
        },

        async fetchArchivedPlaces() {
            this.setAuthorizationHeader();

            try {
                const response = await api.get('/api/archived-lieux');
                this.archivedPlaces = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des lieux archivés:", error.response.data);
            }
        },

        async restoreArchivedPlace(id) {
            this.setAuthorizationHeader();

            try {
                await api.post(`/api/lieux/${id}/restore`);
                await this.fetchPlaces();
                await this.fetchArchivedPlaces();
            } catch (error) {
                console.error("Erreur lors de la restauration du lieu archivé:", error.response.data);
            }
        }
    }
});
