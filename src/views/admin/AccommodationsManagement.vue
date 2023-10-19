<template>
  <div class="hebergements-management-section">
    <h2>Gestion des hébergements</h2>

    <!-- Liste des hébergements -->
    <div class="hebergements-list">
      <h3>Hébergements</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th> <!-- Nouvelle colonne -->
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hebergement in hebergementStore.hebergements" :key="hebergement.id">
          <td>{{ hebergement.id }}</td>
          <td>{{ hebergement.nom }}</td>
          <td>{{ hebergement.description }}</td>
          <td>{{ hebergement.lieu.nom }}</td> <!-- Nouvelle cellule pour afficher le lieu -->

          <td>
            <button @click="archiveHebergement(hebergement.id)">Archiver</button>
            <button @click="selectHebergementForUpdate(hebergement)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Ajouter un nouvel hébergement -->
    <div class="add-hebergement">
      <h3>Ajouter un hébergement</h3>
      <form @submit.prevent="addHebergement">
        <label>
          Nom:
          <input v-model="newHebergement.nom" placeholder="Nom de l'hébergement" required />
        </label>
        <label>
          Description:
          <input v-model="newHebergement.description" placeholder="Description de l'hébergement" required />
        </label>
        <label>
          Prix:
          <input type="number" v-model="newHebergement.prix" placeholder="Prix de l'hébergement" required />
        </label>
        <label>
          URL de la photo:
          <input v-model="newHebergement.photo" placeholder="URL de la photo" required />
        </label>
        <label>
          Lieu:
          <select v-model="newHebergement.lieu_id" required>
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.nom }}</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <!-- Modifier un hébergement existant -->
    <div class="update-hebergement" v-if="selectedHebergement">
      <h3>Modifier un hébergement</h3>
      <form @submit.prevent="updateSelectedHebergement">
        <label>
          Nom:
          <input v-model="selectedHebergement.nom" placeholder="Nom de l'hébergement" required />
        </label>
        <label>
          Description:
          <input v-model="selectedHebergement.description" placeholder="Description de l'hébergement" required />
        </label>
        <label>
          Prix:
          <input type="number" v-model="selectedHebergement.prix" placeholder="Prix de l'hébergement" required />
        </label>
        <label>
          URL de la photo:
          <input v-model="selectedHebergement.photo" placeholder="URL de la photo" required />
        </label>
        <label>
          Lieu:
          <select v-model="selectedHebergement.lieu_id" required>
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.nom }}</option>
          </select>
        </label>

        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des hébergements archivés -->
    <div class="archived-hebergements-list" v-if="hebergementStore.archivedHebergements.length">
      <h3>Hébergements archivés</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th> <!-- Ajouté pour afficher le lieu -->
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hebergement in hebergementStore.archivedHebergements" :key="hebergement.id">
          <td>{{ hebergement.id }}</td>
          <td>{{ hebergement.nom }}</td>
          <td>{{ hebergement.description }}</td>
          <td>{{ hebergement.lieu.nom }}</td> <!-- Affiche le nom du lieu associé -->
          <td>
            <button @click="restoreArchivedHebergement(hebergement.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useHebergementStore } from '@/stores/AccommodationsStore';
import { ref } from 'vue';
import api from "@/services/api";
const lieux = ref([]);
const hebergementStore = useHebergementStore();
hebergementStore.fetchHebergements();
hebergementStore.fetchArchivedHebergements();

const newHebergement = ref({
  nom: '',
  description: '',
  prix: null,
  photo: ''
});

const addHebergement = async () => {
  await hebergementStore.addHebergement(newHebergement.value);
  newHebergement.value = {
    nom: '',
    description: ''
  };
};

const selectedHebergement = ref(null);

const selectHebergementForUpdate = (hebergement) => {
  selectedHebergement.value = Object.assign({}, hebergement);
};

const updateSelectedHebergement = async () => {
  if (!selectedHebergement.value || !selectedHebergement.value.id) return;
  await hebergementStore.updateHebergement(selectedHebergement.value.id, selectedHebergement.value);
  selectedHebergement.value = null;
};

const archiveHebergement = async (id) => {
  try {
    await hebergementStore.archiveHebergement(id);
    await hebergementStore.fetchHebergements();
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'archivage de l'hébergement:", error);
  }
};

const restoreArchivedHebergement = async (id) => {
  await hebergementStore.restoreArchivedHebergement(id);
  await hebergementStore.fetchHebergements();
  await hebergementStore.fetchArchivedHebergements();
};

const fetchLieux = async () => {
  try {
    const response = await api.get('/api/lieux');
    lieux.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des lieux:", error);
  }
};

fetchLieux();
</script>

<style scoped>
/* Votre CSS sera probablement similaire à celui de PlaceManagement. */
.hebergements-management-section {
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
.add-hebergement, .update-hebergement {
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
