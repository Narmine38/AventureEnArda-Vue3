<template>
  <div class="user-management-section">
    <h2>Mon Compte</h2>

    <form @submit.prevent="updateUser">
      <label>
        Nom:
        <input type="text" v-model="editableUser.name" :placeholder="editableUser.name || 'Nom'" required />
      </label>

      <label>
        Email:
        <input type="email" v-model="editableUser.email" :placeholder="editableUser.email || 'Email'" required />
      </label>

      <label>
        Adresse:
        <input type="text" v-model="editableUser.address" :placeholder="editableUser.address || 'Adresse'" required />
      </label>

      <label>
        Ville:
        <input type="text" v-model="editableUser.city" :placeholder="editableUser.city || 'Ville'" required />
      </label>

      <label>
        Pays:
        <input type="text" v-model="editableUser.country" :placeholder="editableUser.country || 'Pays'" required />
      </label>

      <label>
        Code postal:
        <input type="text" v-model="editableUser.postal_code" :placeholder="editableUser.postal_code || 'Code postal'" required />
      </label>

      <label>
        Numéro de téléphone:
        <input type="text" v-model="editableUser.phone_number" :placeholder="editableUser.phone_number || 'Numéro de téléphone'" required />
      </label>

      <label>
        Mot de passe (laissez vide pour ne pas changer):
        <input type="password" v-model="editableUser.password" placeholder="Mot de passe" />
      </label>

      <button type="submit">Mettre à jour</button>
    </form>

    <button @click="confirmDeleteAccount">Supprimer mon compte</button>
  </div>

  <div class="reservations-section">
    <h3>Mes réservations</h3>
    <ul v-if="userReservations && userReservations.length">
      <li v-for="reservation in userReservations" :key="reservation.id">
        ID de réservation: {{ reservation.id }} <br>
        Date d'arrivée: {{ reservation.date_arrivee }} <br>
        Date de départ: {{ reservation.date_depart }} <br>
        Nombre de personnes: {{ reservation.nombre_personnes }} <br>
        Statut: {{ reservation.statut }}
        <button @click="cancelReservation(reservation.id)">Annuler la réservation</button>
      </li>
    </ul>
    <p v-else>Vous n'avez pas encore effectué de réservations.</p>
  </div>

</template>

<script>
import { useRouter } from 'vue-router';
import { useUserProfileStore } from '@/stores/userProfileStore';
import { onMounted, ref } from "vue";
import api from "@/services/api";

export default {
  setup() {
    const userProfileStore = useUserProfileStore();
    const router = useRouter();

    // Récupérer les données utilisateur depuis sessionStorage
    const sessionUserData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = sessionUserData ? sessionUserData.id : null;

    // Utilisation de sessionUserData pour initialiser editableUser
    const editableUser = ref({ ...sessionUserData, password: '' });

    const userReservations = ref([]);
    const fetchReservations = async () => {
      try {
        if (userId) {
          console.log("Fetching reservations for user:", userId);
          const reservations = await userProfileStore.fetchUserReservations(userId);

          if (reservations && Array.isArray(reservations)) {
            userReservations.value = reservations;
            console.log("Reservations fetched:", reservations);
          } else {
            console.error("Unexpected data format received for reservations:", reservations);
          }
        } else {
          console.warn("L'utilisateur n'est pas connecté ou les données de l'utilisateur ne sont pas disponibles.");
        }
      } catch (error) {
        console.error("Error fetching user reservations:", error);
      }
    };


    onMounted(fetchReservations);

    const updateUser = async () => {
      try {
        await userProfileStore.updateUserProfile(editableUser.value);
        console.log('User updated successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    const confirmDeleteAccount = () => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.")) {
        archiveAccount();
      }
    };

    const archiveAccount = async () => {
      try {
        await userProfileStore.archiveUser(userId);
        console.log('User archived successfully!');
        sessionStorage.removeItem('userData');  // Supprimer les données utilisateur du sessionStorage
        await router.push('/connexion');
        window.location.reload();
      } catch (error) {
        console.error('Error archiving account:', error);
      }
    };
    const cancelReservation = async (reservationId) => {
      try {
        await api.post(`/api/reservations/${reservationId}/archive`);
        console.log('Reservation cancelled successfully!');
        // Refresh the reservations list after cancelling one
        fetchReservations();
      } catch (error) {
        console.error('Error cancelling reservation:', error);
      }
    };


    return {
      editableUser,
      userReservations,
      updateUser,
      confirmDeleteAccount,
      cancelReservation
    };
  }
}
</script>


<style scoped>
.user-management-section {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
  border-radius: 8px;
}

label, .reservations-section li {
  display: block;
  margin-bottom: 15px;
}

input {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007BFF;
  outline: none;
}

button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.reservations-section {
  margin-top: 60px;
}

.reservations-section h3 {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.reservations-section li {
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.05);
  list-style-type: none;
}

.reservations-section li:not(:last-child) {
  margin-bottom: 15px;
}
</style>

