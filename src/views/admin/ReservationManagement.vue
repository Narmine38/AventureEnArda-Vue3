<template>
  <div class="reservations-management-section">
    <h2>Gestion des réservations</h2>

    <!-- Liste des réservations -->
    <div class="reservations-list">
      <h3>Réservations</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Utilisateur</th>
          <th>Hébergement</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Nombre de personnes</th>
          <th>Prix</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="reservation in reservationStore.reservations" :key="reservation.id">
          <td>{{ reservation.id }}</td>
          <td>{{ reservation.user.name }}</td>
          <td>{{ reservation.hebergement.nom }}</td>
          <td>{{ reservation.date_arrivee }}</td>
          <td>{{ reservation.date_depart }}</td>
          <td>{{ reservation.nombre_personnes }}</td>
          <td>{{ reservation.prix }} €</td>
          <td>{{ reservation.statut }}</td>
          <td>
            <button @click="archiveReservation(reservation.id)">Archiver</button>
            <button @click="selectReservationForUpdate(reservation)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Modifier une réservation existante -->
    <div class="update-reservation" v-if="selectedReservation">
      <h3>Modifier une réservation</h3>
      <form @submit.prevent="updateSelectedReservation">
        <label>
          Date de début:
          <input type="date" v-model="selectedReservation.date_arrivee" required />
        </label>
        <label>
          Date de fin:
          <input type="date" v-model="selectedReservation.date_depart" required />
        </label>
        <label>
          Nombre de personnes:
          <input type="number" v-model="selectedReservation.nombre_personnes" required />
        </label>
        <label>
          Statut:
          <select v-model="selectedReservation.statut">
            <option value="pending">En attente</option>
            <option value="approved">Confirmé</option>
            <option value="canceled">Annulé</option>
            <!-- Ajoutez d'autres options si nécessaire -->
          </select>
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des réservations archivées -->
    <div class="archived-reservations-list" v-if="reservationStore.archivedReservations.length">
      <h3>Réservations archivées</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Utilisateur</th>
          <th>Hébergement</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Nombre de personnes</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="reservation in reservationStore.archivedReservations" :key="reservation.id">
          <td>{{ reservation.id }}</td>
          <td>{{ reservation.user.name }}</td>
          <td>{{ reservation.hebergement.nom }}</td>
          <td>{{ reservation.date_arrivee }}</td>
          <td>{{ reservation.date_depart }}</td>
          <td>{{ reservation.nombre_personnes }}</td>
          <td>{{ reservation.statut }}</td>
          <td>
            <button @click="restoreArchivedReservation(reservation.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { useReservationStore } from '@/stores/ReservationsStore';
import {ref} from "vue";
const reservationStore = useReservationStore();
reservationStore.fetchReservations();
reservationStore.fetchArchivedReservations();

const selectedReservation = ref(null);

const selectReservationForUpdate = (reservation) => {
  selectedReservation.value = Object.assign({}, reservation);
};

const updateSelectedReservation = async () => {
  if (!selectedReservation.value || !selectedReservation.value.id) return;
  await reservationStore.updateReservation(selectedReservation.value.id, selectedReservation.value);
  selectedReservation.value = null;
};

const archiveReservation = async (id) => {
  try {
    await reservationStore.archiveReservation(id);
    await reservationStore.fetchReservations();
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'archivage de la réservation:", error);
  }
};

const restoreArchivedReservation = async (id) => {
  await reservationStore.restoreArchivedReservation(id);
  await reservationStore.fetchReservations();
  await reservationStore.fetchArchivedReservations();
};
</script>

<style scoped>
/* ... vos styles pour ReservationManagement ici ... */
.reservations-management-section {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
}
.update-reservation {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}
label {
  display: block;
  margin-bottom: 10px;
}
input {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}
</style>
