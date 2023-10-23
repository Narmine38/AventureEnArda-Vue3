<template>
  <div class="places-management-section">
    <h2>Gestion des lieux</h2>

    <!-- Liste des lieux -->
    <div class="places-list">
      <h3>Lieux</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="place in placesStore.places" :key="place.id">
          <td>{{ place.id }}</td>
          <td>{{ place.nom }}</td>
          <td>{{ place.description }}</td>
          <td>
            <button @click="archivePlace(place.id)">Archiver</button>
            <button @click="selectPlaceForUpdate(place)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Ajouter un nouveau lieu -->
    <div class="add-place">
      <h3>Ajouter un lieu</h3>
      <form @submit.prevent="addPlace">
        <label>
          Nom:
          <input v-model="newPlace.nom" placeholder="Nom du lieu" required />
        </label>
        <label>
          Description:
          <input v-model="newPlace.description" placeholder="Description du lieu" required />
        </label>
        <label>
          URL de la photo:
          <input v-model="newPlace.photo" placeholder="URL de la photo" required />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>


    <!-- Modifier un lieu existant -->
    <div class="update-place" v-if="selectedPlace">
      <h3>Modifier un lieu</h3>
      <form @submit.prevent="updateSelectedPlace">
        <label>
          Nom:
          <input v-model="selectedPlace.nom" placeholder="Nom du lieu" required />
        </label>
        <label>
          Description:
          <input v-model="selectedPlace.description" placeholder="Description du lieu" required />
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des lieux archivés -->
    <div class="archived-places-list" v-if="placesStore.archivedPlaces.length">
      <h3>Lieux archivés</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="place in placesStore.archivedPlaces" :key="place.id">
          <td>{{ place.id }}</td>
          <td>{{ place.nom }}</td>
          <td>{{ place.description }}</td>
          <td>
            <button @click="restoreArchivedPlace(place.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { usePlacesStore } from '@/stores/PlacesStore';
import { ref } from 'vue';

const placesStore = usePlacesStore();
placesStore.fetchPlaces();
placesStore.fetchArchivedPlaces();

const newPlace = ref({
  nom: '',
  description: ''
});

const addPlace = async () => {
  await placesStore.addPlace(newPlace.value);
  newPlace.value = {
    nom: '',
    description: '',
    photo: ''
  };
};

const selectedPlace = ref(null);

const selectPlaceForUpdate = (place) => {
  selectedPlace.value = Object.assign({}, place);
};

const updateSelectedPlace = async () => {
  if (!selectedPlace.value || !selectedPlace.value.id) return;
  await placesStore.updatePlace(selectedPlace.value.id, selectedPlace.value);
  selectedPlace.value = null;
};

const archivePlace = async (id) => {
  try {
    await placesStore.archivePlace(id);
    // Rafraîchir la liste des lieux après l'archivage
    await placesStore.fetchPlaces();
    window.location.reload();

  } catch (error) {
    console.error("Erreur lors de l'archivage du lieu:", error);
  }
};

const restoreArchivedPlace = async (id) => {
  await placesStore.restoreArchivedPlace(id);
  await placesStore.fetchPlaces();
  await placesStore.fetchArchivedPlaces();
};
</script>

<style scoped>
.places-management-section {
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
.add-place, .update-place {
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
