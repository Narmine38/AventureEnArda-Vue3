<template>
  <div class="activites">
    <h1>Activités en Terre du Milieu</h1>
    <p>
      La Terre du Milieu offre une variété d'activités passionnantes à découvrir.
    </p>
    <ActiviteCard v-for="activiteItem in activites" :key="activiteItem.id" :activite="activiteItem" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import api from "@/services/api";
import ActiviteCard from "@/components/ActiviteCard.vue";  // Vous devrez créer ce composant

const activites = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/api/activites');
    activites.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des activités:', error);
  }
});
</script>

<style scoped>
/* ... vos styles pour Activite.vue ici ... */
</style>
