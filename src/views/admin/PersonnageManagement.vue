<template>
  <div class="personnages-management-section">
    <h2>Gestion des personnages</h2>

    <!-- Liste des personnages -->
    <div class="personnages-list">
      <h3>Personnages</h3>
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
        <tr v-for="personnage in personnageStore.personnages" :key="personnage.id">
          <td>{{ personnage.id }}</td>
          <td>{{ personnage.nom }}</td>
          <td>{{ personnage.histoire }}</td>
          <td>{{ personnage.photo }}</td>
          <td>{{ personnage.lieu.nom }}</td> <!-- Nouvelle cellule pour afficher le lieu -->

          <td>
            <button @click="archivePersonnage(personnage.id)">Archiver</button>
            <button @click="selectPersonnageForUpdate(personnage)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Ajouter un nouveau personnage -->
    <div class="add-personnage">
      <h3>Ajouter un personnage</h3>
      <form @submit.prevent="addPersonnage">
        <label>
          Nom:
          <input v-model="newPersonnage.nom" placeholder="Nom du personnage" required />
        </label>
        <label>
          Histoire:
          <input v-model="newPersonnage.histoire" placeholder="Histoire du personnage" required />
        </label>
        <label>
          URL de la photo:
          <input v-model="newPersonnage.photo" placeholder="URL de la photo" required />
        </label>
        <label>
          Lieu:
          <select v-model="newPersonnage.lieu_id" required>
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.nom }}</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <!-- Modifier un personnage existant -->
    <div class="update-personnage" v-if="selectedPersonnage">
      <h3>Modifier un personnage</h3>
      <form @submit.prevent="updateSelectedPersonnage">
        <label>
          Nom:
          <input v-model="selectedPersonnage.nom" placeholder="Nom du personnage" required />
        </label>
        <label>
          Histoire:
          <input v-model="selectedPersonnage.histoire" placeholder="Histoire du personnage" required />
        </label>
        <label>
          URL de la photo:
          <input v-model="selectedPersonnage.photo" placeholder="URL de la photo" required />
        </label>
        <label>
          Lieu:
          <select v-model="selectedPersonnage.lieu_id" required>
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.nom }}</option>
          </select>
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des personnages archivés -->
    <div class="archived-personnages-list" v-if="personnageStore.archivedPersonnages.length">
      <h3>Personnages archivés</h3>
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
        <tr v-for="personnage in personnageStore.archivedPersonnages" :key="personnage.id">
          <td>{{ personnage.id }}</td>
          <td>{{ personnage.nom }}</td>
          <td>{{ personnage.histoire }}</td>
          <td>{{ personnage.lieu.nom }}</td> <!-- Affiche le nom du lieu associé -->
          <td>
            <button @click="restoreArchivedPersonnage(personnage.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { usePersonnageStore } from '@/stores/PersonnageStore';
import { ref } from 'vue';
import api from "@/services/api";
const lieux = ref([]);

const personnageStore = usePersonnageStore();
personnageStore.fetchPersonnages();
personnageStore.fetchArchivedPersonnages();

const newPersonnage = ref({
  nom: '',
  histoire: '',
  photo: '',   // champ photo ajouté
  lieu_id: ''  // champ lieu_id ajouté
});

const addPersonnage = async () => {
  await personnageStore.addPersonnage(newPersonnage.value);
  newPersonnage.value = {
    nom: '',
    histoire: '',
    photo: '',   // champ photo ajouté
    lieu_id: ''  // champ lieu_id ajouté
  };
};

const selectedPersonnage = ref(null);

const selectPersonnageForUpdate = (personnage) => {
  selectedPersonnage.value = Object.assign({}, personnage);
};

const updateSelectedPersonnage = async () => {
  if (!selectedPersonnage.value || !selectedPersonnage.value.id) return;
  await personnageStore.updatePersonnage(selectedPersonnage.value.id, selectedPersonnage.value);
  selectedPersonnage.value = null;
};

const archivePersonnage = async (id) => {
  try {
    await personnageStore.archivePersonnage(id);
    await personnageStore.fetchPersonnages();
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'archivage du personnage:", error);
  }
};

const restoreArchivedPersonnage = async (id) => {
  await personnageStore.restoreArchivedPersonnage(id);
  await personnageStore.fetchPersonnages();
  await personnageStore.fetchArchivedPersonnages();
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
/* Les styles CSS seront probablement similaires à ceux des autres composants de gestion. */
.personnages-management-section {
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
.add-personnage, .update-personnage {
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
