import { defineStore } from 'pinia';
import api from '@/services/api';

export const useReservationStore = defineStore('reservations', {
    state: () => ({
        reservations: [],
        archivedReservations: []
    }),

    actions: {
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        async fetchReservations() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/reservations');
                this.reservations = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des réservations:", error.response.data);
            }
        },

        async addReservation(reservation) {
            this.setAuthorizationHeader();
            try {
                await api.post('/api/reservations', reservation);
            } catch (error) {
                console.error("Erreur lors de l'ajout de la réservation:", error.response.data);
            }
        },

        async updateReservation(id, updatedReservation) {
            this.setAuthorizationHeader();
            try {
                await api.put(`/api/reservations/${id}`, updatedReservation);
                await this.fetchReservations();
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la réservation:", error.response.data);
            }
        },

        async archiveReservation(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/reservations/${id}/archive`);
                await this.fetchReservations();
            } catch (error) {
                console.error("Erreur lors de l'archivage de la réservation:", error.response.data);
            }
        },

        async fetchArchivedReservations() {
            this.setAuthorizationHeader();
            try {
                const response = await api.get('/api/reservations-archived');
                this.archivedReservations = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des réservations archivées:", error.response.data);
            }
        },

        async restoreArchivedReservation(id) {
            this.setAuthorizationHeader();
            try {
                await api.post(`/api/reservations/${id}/restore`);
                await this.fetchReservations();
                await this.fetchArchivedReservations();
            } catch (error) {
                console.error("Erreur lors de la restauration de la réservation archivée:", error.response.data);
            }
        }
    }
});
