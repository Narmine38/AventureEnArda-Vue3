<template>
  <div>
    <h2>Créer une réservation</h2>
    <form @submit.prevent="createReservation">
      <!-- Choix du lieu -->
      <select v-model="reservation.lieu_id" required>
        <option v-for="place in placesStore.places" :key="place.id" :value="place.id">
          {{ place.nom }}
        </option>
      </select>

      <!-- Choix de l'hébergement -->
      <select v-model="reservation.hebergement_id" required>
        <option v-for="hebergement in hebergementStore.hebergements" :key="hebergement.id" :value="hebergement.id">
          {{ hebergement.nom }}
        </option>
      </select>

      <!-- Choix de l'activité -->
      <select v-model="reservation.activite_id" required>
        <option v-for="activite in activiteStore.activites" :key="activite.id" :value="activite.id">
          {{ activite.nom }}
        </option>
      </select>

      <!-- Choix du personnage -->
      <select v-model="reservation.personnage_id" required>
        <option v-for="personnage in personnageStore.personnages" :key="personnage.id" :value="personnage.id">
          {{ personnage.nom }}
        </option>
      </select>

      <!-- Dates et nombre de personnes -->
      <input type="date" v-model="reservation.date_arrivee" required>
      <input type="date" v-model="reservation.date_depart" required>
      <input type="number" v-model="reservation.nombre_personnes" required>

      <!-- Bouton de soumission -->
      <button type="submit">Réserver</button>
    </form>
  </div>
</template>

<script>
import { usePlacesStore } from '@/stores/PlacesStore';
import { useHebergementStore } from '@/stores/AccommodationsStore';
import { useActiviteStore } from '@/stores/ActiviteStore';
import { usePersonnageStore } from '@/stores/PersonnageStore';
import { useReservationStore } from '@/stores/ReservationsStore';

export default {
  data() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData ? userData.id : null;

    return {
      reservation: {
        user_id: userId,
        statut: 'pending',
        lieu_id: null,
        hebergement_id: null,
        activite_id: null,
        personnage_id: null,
        date_arrivee: '',
        date_depart: '',
        nombre_personnes: 1,
      }
    };
  },
  computed: {
    placesStore() {
      return usePlacesStore();
    },
    hebergementStore() {
      return useHebergementStore();
    },
    activiteStore() {
      return useActiviteStore();
    },
    personnageStore() {
      return usePersonnageStore();
    },
    reservationStore() {
      return useReservationStore();
    }
  },
  methods: {
    async createReservation() {
      try {
        await this.reservationStore.addReservation(this.reservation);
        alert('Réservation réussie!');
      } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error);
      }
    }
  },
  mounted() {
    // Assurez-vous que toutes les données nécessaires sont chargées ici
    this.placesStore.fetchPlaces();
    this.hebergementStore.fetchHebergements();
    this.activiteStore.fetchActivites();
    this.personnageStore.fetchPersonnages();
  }
};
</script>
